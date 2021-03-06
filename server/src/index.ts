//const express = require('express');
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "./routes/User";
import cardRouter from "./routes/Card";
import listRouter from "./routes/List";
import boardRouter from "./routes/Board";
import sessionRouter from "./routes/Session";
import loginRouter from "./routes/Login";
import path from "path";
import imageRouter from "./routes/Image";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../static")));

const PORT = process.env.SERVER_PORT || 5555;
const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/teaming_loc";

app.get("/", (req, res) => {
  res.send(`<h2>${DB_URL}</h2>`);
});

// connect to db
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", (err: any) => console.error(err));
db.once("open", () => console.log("connected to MongoDB"));

// routes

app.use("/user", userRouter);
app.use("/card", cardRouter);
app.use("/list", listRouter);
app.use("/board", boardRouter);
app.use("/session", sessionRouter);
app.use("/login", loginRouter);
app.use("/image", imageRouter); 

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
