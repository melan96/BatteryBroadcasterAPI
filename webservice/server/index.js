//import mongoose from "mongoose";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const RegisterRouter = require("./routes/register.routes.js");
const mongoose = require("mongoose");
const LoginRoute = require("./routes/login.routes.js");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("hello").status(200);
});
app.use("/register", RegisterRouter);
app.use("/login", LoginRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://root:toor@cluster0.rpbhq.mongodb.net/BatteryBroadcasterCluster?retryWrites=true&w=majority",
  (err) => {
    console.log(err.message);
  }
);

app.listen(PORT, () => {
  console.log("app listen on port " + PORT);
});
