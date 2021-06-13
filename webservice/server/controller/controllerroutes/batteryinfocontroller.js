const batteryinfomodel = require("../../models/batteryinfomodel");

exports.batteryRoutePost = async (req, res) => {
  //creating a method for call post instance in seperate file
  await console.log(req.body);

  const batteryInfoDump = await new batteryinfomodel({
    uid: req.params.id,
    technology: req.body.technology,
    chargingStatus: req.body.chargingStatus,
    currentFlowNow: req.body.currentFlowNow,
    batteryTemperature: req.body.batteryTemperature,
    batteryLevel: req.body.batteryLevel,
    chargingTimeRemaining: req.body.chargingTimeRemaining,
    batteryHealth: req.body.batteryHealth,
    pluggedStatus: req.body.pluggedStatus,
    reamainingEnergy: req.body.reamainingEnergy,
    volatage: req.body.volatage,
  });

  await batteryInfoDump
    .save()
    .then((message) => {
      console.log(message);
      res.send({ message: message, error: false }).status(200);
    })
    .catch((err) => {
      console.log(err);
      res
        .send({ message: "internal server error occured", error: true })
        .status(400);
    });
};
