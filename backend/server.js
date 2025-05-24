import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/auth.js";
import recipeRouter from "./routes/recipes.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const server = express();

server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/recipies", recipeRouter);

server.get("/", (req, res) => {
  res.status(200).send("server is running");
});

server.listen(PORT, () => {
  connectDB();
  console.log("server is running");
});
