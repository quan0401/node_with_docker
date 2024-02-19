const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PWD,
} = require("./config/config");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    // .connect("mongodb://quan0401:mypassword@172.31.0.2:27017/?authSource=admin")
    // .connect("mongodb://quan0401:mypassword@mongo:27017/?authSource=admin")
    .connect(mongoURI)
    .then(() => console.log("Successfully connected to DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(() => {
        connectWithRetry();
      }, 5000);
    });
};
app.get("/", (req, res) => {
  res.send("<h2>Hello world with Docker 🐳</h2>");
});
connectWithRetry();
// Middle ware
app.use(express.json()); // to pass in body

// Routes
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
