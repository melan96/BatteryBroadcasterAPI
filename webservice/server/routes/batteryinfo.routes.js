const express = require("express");
const mongoose = require("mongoose");
const batteryinfomodel = require("../models/batteryinfomodel");
const {
  batteryRoutePost,
  getBySpecificID,
  getLatestResource,
} = require("../controller/controllerroutes/batteryinfocontroller");

const BatteryRoute = express.Router();

BatteryRoute.post("/:id", batteryRoutePost);

BatteryRoute.get("/:id", getBySpecificID);

BatteryRoute.get("/getlatest/:id", getLatestResource);

module.exports = BatteryRoute;
