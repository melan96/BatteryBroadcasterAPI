const express = require("express");
const mongoose = require("mongoose");
const batteryinfomodel = require("../models/batteryinfomodel");
const {
  batteryRoutePost,
} = require("../controller/controllerroutes/batteryinfocontroller");

const BatteryRoute = express.Router();

BatteryRoute.post("/:id", batteryRoutePost);

BatteryRoute.get("/:id", async (req, res) => {
  console.log("Request captured with ID " + req.params.id);
  try {
    await batteryinfomodel.find({ uid: req.params.id }, (err, docs) => {
      if (err) {
        res.send({ error: true, message: err.message }).status(400);
        res.end();
      } else {
        res.send({ error: false, message: docs }).status(200);
      }
    });
  } catch (ex) {
    res.send({ error: true, message: ex.message }).status(400);
  }
});

BatteryRoute.get("/getlatest/:id", async (req, res) => {
  console.log("Request captured with ID " + req.params.id);
  try {
    await batteryinfomodel
      .findOne({ uid: req.params.id })
      .sort({ timestamp: -1 })
      .exec((err, docs) => {
        if (err) {
          res.send({ error: true, message: err.message }).status(400);
          res.end();
        } else {
          res.send({ error: false, message: docs }).status(200);
        }
      });
  } catch (ex) {
    res.send({ error: true, message: ex.message }).status(400);
  }
});

module.exports = BatteryRoute;
