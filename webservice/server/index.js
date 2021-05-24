//import mongoose from "mongoose";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

app.listen(PORT, () => {
  console.log("app listen on port " + PORT);
});
