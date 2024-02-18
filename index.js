import express from "express";
import mongoose from "mongoose";
import { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PWD } from "./config.js";

const app = express();

const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose
  // .connect("mongodb://quan0401:mypassword@172.31.0.2:27017/?authSource=admin")
  // .connect("mongodb://quan0401:mypassword@mongo:27017/?authSource=admin")
  .connect(mongoURI)
  .then(() => console.log("Successfully connected to DB"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("<h2>Hello world with Docker 🐳</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
