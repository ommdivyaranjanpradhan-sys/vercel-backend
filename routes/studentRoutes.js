import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// Add student
router.post("/add", async (req, res) => {
  const student = await Student.create(req.body);
  res.json({ msg: "Student added", student });
});

// Get all students
router.get("/all", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.get("/count", async (req, res) => {
  const totalStudents = await Student.countDocuments();
  res.json({ totalStudents });
});

// Delete student
router.delete("/delete/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ msg: "Student deleted" });
});

export default router;
