import mongoose, { Schema } from "mongoose";

const PlayList = new Schema({
  id: { type: String, required: true, max: 100 },
  title: { type: String, required: true, max: 100 }
});

export default mongoose.model("playList", PlayList);
