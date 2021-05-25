const express = require("express");
const mongoose = require("mongoose");
const {
  LoginController,
} = require("../controller/controllerroutes/logincontroller");
const UserModel = require("../models/usermodel");

const LoginRoute = express.Router();

LoginRoute.post("/", LoginController);

module.exports = LoginRoute;
