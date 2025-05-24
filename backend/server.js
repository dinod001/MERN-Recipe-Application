import express from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const server = express();

server.get("/", (req, res) => {
  res.status(200).send("server is running");
});

server.listen(PORT, () => {
  console.log("server is running");
});
