import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import bookRoutes from "./routes/bookRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import Book from "./models/Book.js";
import Issue from "./models/Issue.js";
import Student from "./models/Student.js";

const app = express();

app.use(express.json());
app.use(cors());

// DB connect
connectDB();

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);

// Dashboard stats
app.get("/api/stats", async (req, res) => {
  const totalBooks = await Book.countDocuments();
  const issuedBooks = await Issue.countDocuments();
  const students = await Student.countDocuments();

  res.json({
    totalBooks,
    issuedBooks,
    students
  });
});

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
