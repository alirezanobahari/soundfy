import ffmpeg from "fluent-ffmpeg";
import path from "path";

const configs = {
  ffmpegPath: `${path.resolve(__dirname, "..", "..", "..")}`,
  audioBitrate: [96, 128, 196, 320],
  audioCodec: "libmp3lame",
  outputFormat: "mp3",
  processTimeout: 600000
};

export default (videoStream, title = "", artist = "") => {
  const {
    ffmpegPath,
    audioBitrate,
    audioCodec,
    outputFormat,
    processTimeout
  } = configs;

  console.log(ffmpegPath);

  var command = ffmpeg({
    source: videoStream
  })
    .setFfmpegPath(ffmpegPath)
    .audioBitrate(audioBitrate[2])
    .withAudioCodec(audioCodec)
    .toFormat(outputFormat)
    .outputOptions("-id3v2_version", "4")
    .outputOptions("-metadata", "title=" + title)
    .outputOptions("-metadata", "artist=" + artist)
    .on("error", err => {
      throw err;
    });

  // Set timeout for ffmpeg convert process
  setTimeout(() => {
    command.kill();
    command.on("error", () => {
      console.log("Ffmpeg has been killed");
      throw err;
    });
  }, processTimeout);

  return command;
};
