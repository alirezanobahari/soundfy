import mongoose, { Schema } from "mongoose";

const MusicSchema = new Schema({
  videoId: { type: String, required: true, max: 200 },
  downloadId: { type: String, required: true, max: 100 },
  telegramFileId: { type: String, required: false, max: 100 },
  title: { type: String, required: true, max: 500 },
  duration: { type: String, required: false, max: 10, default: "00:00" },
  size: { type: Number, required: false, default: 0 },
  quality: { type: String, required: false, max: 32, default: "96" }
});

export default mongoose.model("music", MusicSchema);
