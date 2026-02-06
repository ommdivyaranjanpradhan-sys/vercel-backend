import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.json({ msg: "User already exists" });

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hash,
    role: role || "student"
  });

  res.json({ msg: "User registered successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ msg: "Invalid password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "library_secret",
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role
    }
  });
});

export default router;
