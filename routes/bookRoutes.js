import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// Add book
router.post("/add", async (req, res) => {
  const book = await Book.create(req.body);
  res.json({ msg: "Book added", book });
});

// Get all books
router.get("/all", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Delete book
router.delete("/delete/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ msg: "Book deleted" });
});


router.get("/count", async (req, res) => {
  const totalBooks = await Book.countDocuments();
  res.json({ totalBooks });
});

export default router;



