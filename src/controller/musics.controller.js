import Music from "../model/music.model";
import search from "../core/search/search";
import unescape from "lodash.unescape";
import { fileNameReplacement, truncate } from "../utils/string-utils";
import download from "../core/download/download";
import ffmpegConverter from "../core/convert/ffmpeg-converter";
import { BOT_ID, STORAGE_CHANNEL_USERNAME } from "../common/constants";
import { createWriteStream, createReadStream, unlink } from "fs";
import path from "path";

export const searchMusic = async (telegramMessage, botInterface) => {
  try {
    // Perform search in services (YouTube, etc...)
    const { results } = await search(telegramMessage.text);

    // Perform query in music dbmodel
    const musicQuery = Music.find();
    musicQuery.collection(Music.collection);
    const savedMusics = await musicQuery
      .where("videoId")
      .in(results.map(res => res.id))
      .exec();

    // Filter unsaved musics from search result and map them to music model
    const unsavedMusics = results
      .filter(
        res =>
          typeof savedMusics.find(m => m.videoId === res.id) === "undefined"
      )
      .map(unsavedMusic => ({
        videoId: unsavedMusic.id,
        downloadId: `/dl_${[...Array(10)].map(_ =>
          ((Math.random() * 36) | 0).toString(36)
        ).join``}`,
        title: unsavedMusic.title
      }));

    // Save unsaved musics
    await Music.insertMany(unsavedMusics);

    // Construct return message
    const messageTitle = searchQuery =>
      `🔎 نتایج جستجو برای: <b>${searchQuery}</b>`;
    const linearhDivider =
      "\n\nـــــــــــــــــــــــــــــــــــــــــــــــ\n\n";
    const linedashDivider = "\n------------------------------------\n\n";
    const musicItem = (music, index) => {
      const musicTitle = `<b>${index}. ${truncate(
        fileNameReplacement(unescape(music.title))
      )}</b>`;
      const download = `\n📥 download: ${music.downloadId}`;
      const metadata = `\n🕒 ${music.duration} - 💾 ${music.size} - 📀 ${
        music.quality
      }`;
      return musicTitle + download + /*metadata +*/ linedashDivider;
    };
    const message =
      messageTitle(telegramMessage.text) +
      linearhDivider +
      [...savedMusics, ...unsavedMusics].map(musicItem);

    // Send message
    botInterface.sendText(telegramMessage.chat.id, message);
  } catch (e) {
    // For now
    console.log(e);
  }
};

export const downloadMusic = async (telegramMessage, botInterface) => {
  try {
    const music = await Music.findOne({
      downloadId: telegramMessage.text
    }).exec();
    if (music.telegramFileId) {
      const audioMessage = await botInterface.sendAudio(
        telegramMessage.chat.id,
        "",
        music.telegramFileId
      );
      await botInterface.editCaption(
        telegramMessage.chat.id,
        audioMessage.message_id,
        `\n\n ${BOT_ID}`
      );
    } else {
      const videoTempPath = `${path.resolve(__dirname, "..", "..")}/tmp/${
        music.title
      }.flv`;
      const musicTempPath = `${path.resolve(__dirname, "..", "..")}/tmp/${
        music.title
      }.mp3`;

      const waitMessage = await botInterface.sendText(
        telegramMessage.chat.id,
        "... لطفاً کمی صبر کنید"
      );
      console.log(`${Date.now()} - downloading video`);
      // Download video
      const videoStream = await download(music.videoId);

      videoStream.pipe(createWriteStream(videoTempPath));
      videoStream.on("end", () => {
        console.log(`${Date.now()} - video downloaded`);
        // Convert to mp3
        console.log(`${Date.now()} - converting`);
        const saveCommand = ffmpegConverter(createReadStream(videoTempPath));
        // Write converted stream to temporary file
        saveCommand.pipe(createWriteStream(musicTempPath));

        saveCommand.on("end", async () => {
          try {
            console.log(`${Date.now()} - converted`);
            console.log(`${Date.now()} - uploading`);
            // Send to storage channel
            const audioMessage = await botInterface.sendAudio(
              STORAGE_CHANNEL_USERNAME,
              music.title,
              createReadStream(musicTempPath)
            );
            console.log(`${Date.now()} - uploaded`);

            //Delete uploaded file
            unlink(videoTempPath, err => {
              console.log(err);
            });
            unlink(musicTempPath, err => {
              console.log(err);
            });

            // Delete waitMessage
            await botInterface.deleteMessage(
              telegramMessage.chat.id,
              waitMessage.message_id
            );

            // Save messageId to db
            music.telegramFileId = audioMessage.audio.file_id;
            music.save();

            // Send music to user
            const userAudioMessage = await botInterface.sendAudio(
              telegramMessage.chat.id,
              "",
              audioMessage.audio.file_id
            );
            await botInterface.editCaption(
              telegramMessage.chat.id,
              userAudioMessage.message_id,
              `\n\n ${BOT_ID}`
            );
          } catch (e) {
            //Delete file if error happened
            unlink(videoTempPath, err => {
              console.log(err);
            });
            unlink(musicTempPath, err => {
              console.log(err);
            });
            console.log(e);
          }
        });
      });
    }
  } catch (e) {
    console.log(e);
  }
};
