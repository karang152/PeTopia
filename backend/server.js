require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//MongoDB Connection
// dotenv.config;

const app = express();

//Create Route
app.get("/", (req, res) => {
  res.send("Server is Ready");
});

//Server Getting Started
// app.listen(9000, () => {
//   //console.log("Server started at http://localhost:9000");
//   console.log("Server Started");
// });

//Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
    const PORT = 9000;
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
