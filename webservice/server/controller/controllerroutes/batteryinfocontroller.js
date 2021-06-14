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

//Code module for get an instance by specific idset
exports.getBySpecificID = async (req, res) => {
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
};

//get specific resource latest /ID

exports.getLatestResource = async (req, res) => {
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
};
