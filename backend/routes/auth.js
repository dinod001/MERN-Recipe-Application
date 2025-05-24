import express from "express";
import User from "../models/user";

const authRouter = express.Router();

//regitser new user
authRouter.post("/", async (req, res) => {
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
    res
      .status(201)
      .json({ _id: user._id, username: user.username, email: username.email });
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNEL SERVER ERROR", err: error });
  }
});

export default authRouter;
