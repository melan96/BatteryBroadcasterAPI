const express = require("express");
const {
  RegisterRouteController,
} = require("../controller/controllerroutes/registercontroller");

const RegisterRoute = express.Router();

RegisterRoute.post("/", RegisterRouteController);

module.exports = RegisterRoute;
