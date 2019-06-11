import ytdl from "ytdl-core";
import progress from "progress-stream";

const configs = {
  youtubeBaseUrl: "http://www.youtube.com/watch?v=",
  youtubeVideoQuality: "highestaudio",
  requestOptions: { maxRedirects: 5 }
};

export default async videoId => {
  const { youtubeBaseUrl, youtubeVideoQuality, requestOptions } = configs;

  const info = await ytdl.getInfo(youtubeBaseUrl + videoId, {
    quality: youtubeVideoQuality
  });
  console.log(info);
  const videoStream = ytdl.downloadFromInfo(info, {
    quality: youtubeVideoQuality,
    requestOptions: requestOptions
  });
  return videoStream;
};
