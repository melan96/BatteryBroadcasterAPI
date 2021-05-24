const mongoose = require("mongoose");
const UserModel = require("../../models/usermodel");
const bcrypt = require("bcrypt");
const { hashPasswordBc } = require("../passwordhash");

exports.RegisterRouteController = async (req, res) => {
  console.log(req.body);

  const userdump = await new UserModel({
    username: req.body.username,

    password: bcrypt.hashSync(req.body.password, 10),
  });

  await userdump
    .save()
    .then((message) => {
      console.log(message);
      res.send(message).status(200);
    })
    .catch((err) => {
      console.log(err);
    });
};
