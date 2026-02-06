import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  issueDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Issue", issueSchema);
