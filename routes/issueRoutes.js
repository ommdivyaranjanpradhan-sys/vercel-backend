import express from "express";
import Issue from "../models/Issue.js";

const router = express.Router();

// Issue book
router.post("/book", async (req, res) => {
  const { student, book } = req.body;
  await Issue.create({ student, book });
  res.json({ msg: "Book issued successfully" });
});

// Get all issued books
router.get("/all", async (req, res) => {
  const data = await Issue.find().populate("student").populate("book");
  res.json(data);
});

// Return book
router.delete("/return/:id", async (req, res) => {
  await Issue.findByIdAndDelete(req.params.id);
  res.json({ msg: "Book returned successfully" });
});

router.get("/count", async (req, res) => {
  const issuedBooks = await Issue.countDocuments();
  res.json({ issuedBooks });
});



export default router;
