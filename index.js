import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("<h2>delete everything 1234</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
