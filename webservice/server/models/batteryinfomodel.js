import mongoose, { Mongoose } from "mongoose";
const BatteryInfoSchema = mongoose.Schema({
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
});

module.exports = mongoose.model("BatteryInfoModel", BatteryInfoSchema);
