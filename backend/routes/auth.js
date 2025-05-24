import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/auth.js";

const authRouter = express.Router();

//regitser new user
authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fileds" });
    }
    const checkexist = await User.findOne({ email });
    if (checkexist) {
      return res.status(400).json({ message: "User already exist" });
    }
    const user = await User.create({ username, email, password });
    const token = generateWebToken(user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: username.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNEL SERVER ERROR", err: error });
  }
});

//login user
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || (await !user.matchPassword(password))) {
      return res.status(400).json({ message: "Inavlid credentials" });
    }
    const token = generateWebToken(user._id);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNEL SERVER ERROR", err: error });
  }
});

authRouter.get("/me", protect, async (req, res) => {
  res.status(200).json(req.user);
});

//genrated web token
const generateWebToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default authRouter;
