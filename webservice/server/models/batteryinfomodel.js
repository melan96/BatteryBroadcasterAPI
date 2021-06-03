const mongoose = require("mongoose");
const usermodel = require("./usermodel");
const BatteryInfoSchema = new mongoose.Schema({
  uid: String,
  technology: String,
  chargingStatus: String,
  currentFlowNow: String,
  batteryTemperature: String,
  batteryLevel: String,
  chargingTimeRemaining: String,
  batteryHealth: String,
  pluggedStatus: String,
  reamainingEnergy: String,
  volatage: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BatteryInfoModel", BatteryInfoSchema);
