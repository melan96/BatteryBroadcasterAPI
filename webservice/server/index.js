//import mongoose from "mongoose";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const RegisterRouter = require("./routes/register.routes.js");
const mongoose = require("mongoose");
const LoginRoute = require("./routes/login.routes.js");
const BatteryRoute = require("./routes/batteryinfo.routes.js");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("hello").status(200);
});
app.use("/register", RegisterRouter);
app.use("/login", LoginRoute);
app.use("/batteryinfo", BatteryRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_DB_URL, (err) => {
  console.log(err.message);
});

app.listen(PORT, () => {
  console.log("app listen on port " + PORT);
});
