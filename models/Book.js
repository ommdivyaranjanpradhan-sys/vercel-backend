import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: String,
  quantity: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
