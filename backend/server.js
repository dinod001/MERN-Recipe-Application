import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const server = express();

server.get("/", (req, res) => {
  res.status(200).send("server is running");
});

server.listen(PORT, () => {
  connectDB();
  console.log("server is running");
});
