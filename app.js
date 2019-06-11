import { DEV_DB_URL } from "./src/common/constants";
import mongoose from "mongoose";
import Bot from "./src/bot/bot";
import { botApi, commandProcessor } from "./dependencies-provider";
import { get } from "https";
import { createWriteStream } from "fs";

/////////////////////////////////////////////////////////////
// Connect to mongodb
/////////////////////////////////////////////////////////////
mongoose.connect(DEV_DB_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
// Run bot
/////////////////////////////////////////////////////////////
new Bot(botApi, commandProcessor);
/////////////////////////////////////////////////////////////

// const ffmpeg = createWriteStream("ffmpeg");
// const ffprobe = createWriteStream("ffprobe");
// get(
//   "https://uc52a5005bd040bb8d1a4f679ff3.dl.dropboxusercontent.com/cd/0/get/AildEYH0WwOrgxZHluHUiTcbrl54hzLuWRU0rZqu_dz-kjpApfs1o6TpxlOmQl1KHcqS04UYWFyij5sX-x6zdZ-j_fdKLm-3jYIHxEJTjdkOkA/file?dl=1#",
//   res => (
//     res.pipe(ffmpeg),
//     res.on("end", () => (console.log("ffmpeg downloaded."), ffmpeg.close()))
//   )
// );
// get(
//   "https://uc21b3137f5220d3517016303d21.dl.dropboxusercontent.com/cd/0/get/AimWObAQytoG5H9paxdl2ZgjKUA3WdMg-MakJHjEZvWFQHzgWXFdcvgAOlMlW78sM6PC5XlaK3_KtUqV5KUgPuVzEq_7fnTgIYFYCLhv2yTNsQ/file?dl=1#",
//   res => (
//     res.pipe(ffprobe),
//     res.on("end", () => (console.log("ffprobe downloaded."), ffprobe.close()))
//   )
// );
