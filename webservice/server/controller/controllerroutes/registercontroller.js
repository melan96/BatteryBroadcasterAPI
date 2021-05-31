const mongoose = require("mongoose");
const UserModel = require("../../models/usermodel");
const bcrypt = require("bcryptjs");
const { hashPasswordBc } = require("../passwordhash");
const { authSchema } = require("../../helper/joivalidation.js");

exports.RegisterRouteController = async (req, res) => {
  //Joi validations

  try {
    const valuejoi = await authSchema.validateAsync(req.body);
    console.log(valuejoi);

    try {
      const exis = await UserModel.exists({ username: req.body.username });

      console.log("-->" + exis);

      if (exis) {
        res
          .send({ message: "user already registerd", error: true })
          .status(200);
      } else {
        const userdump = await new UserModel({
          username: req.body.username,

          password: bcrypt.hashSync(req.body.password, 10),
        });

        await userdump
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
      }
    } catch (error) {
      res
        .send({ message: "internal server error occured", error: true })
        .status(500);
    }
  } catch (error) {
    res.send({ message: error.message, error: true }).status(400);
  }
};
