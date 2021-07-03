const express = require("express");
const mongoose = require("mongoose");
const batteryinfomodel = require("../models/batteryinfomodel");
const {
  batteryRoutePost,
  getBySpecificID,
  getLatestResource,
} = require("../controller/controllerroutes/batteryinfocontroller");
const JWTAuthenticationClient = require("../controller/jwt_authentication");

const BatteryRoute = express.Router();

BatteryRoute.post("/:id", batteryRoutePost);

BatteryRoute.get("/:id", getBySpecificID);

BatteryRoute.get(
  "/getlatest/:id",
  new JWTAuthenticationClient().authEndPointAccess,
  getLatestResource
);

module.exports = BatteryRoute;
