const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PWD,
  REDIS_URL,
  SESSION_SECRET,
  REDIS_PORT,
} = require("./config/config");
const cors = require("cors");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

// Redis
const session = require("express-session");
const redis = require("redis");
let RedisStore = require("connect-redis")(session);

// Initialize client.
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const app = express();

const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose
    // .connect("mongodb://quan0401:mypassword@172.31.0.2:27017/?authSource=admin")
    // .connect("mongodb://quan0401:mypassword@mongo:27017/?authSource=admin")
    .connect(mongoURI, {
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};
app.get("/api", (req, res) => {
  res.send("<h2>Hello world with Docker 🐳!! i dont know why bro aushit</h2>");
  console.log("Yeah it ran");
});

connectWithRetry();

// Middle ware
app.use(express.json()); // to pass in body
app.enable("trust proxy");
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({
      client: redisClient,
    }),
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 300000,
    },
  })
);

// Routes
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
