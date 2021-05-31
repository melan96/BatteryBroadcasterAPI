const mongoose = require("mongoose");
const usermodel = require("../../models/usermodel.js");
const bcrypt = require("bcryptjs");
const { loginSchema } = require("../../helper/joivalidation.js");

const passwordCryptCheck = (password, crypt) => {
  return bcrypt.compareSync(password, crypt);
};

exports.LoginController = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userdump = usermodel;
  await userdump.find({ username: username }, async (err, document) => {
    if (err) {
      console.log(err);
      res
        .send({ message: "cannot find user by given user", error: true })
        .status(422);
      return;
    } else {
      try {
        const joiresult = await loginSchema.validateAsync(req.body);
        console.log(joiresult);

        try {
          if (document.length == 0 || document.length == null) {
            res
              .send({
                message: "cannot find the user by " + username,
                error: true,
              })
              .status(422);
          } else {
            if (passwordCryptCheck(password, document[0]["password"])) {
              res.send({ message: document, error: false }).status(200);
              console.log(document[0]);
              return;
            } else {
              res
                .send({ message: "password not match with user", error: true })
                .status(404);
            }
          }
        } catch (error) {
          res
            .send({ message: "internal server error occured", error: true })
            .status(500);
        }
      } catch (error) {
        console.log(error);
        res.send({ message: error.message, error: true }).status(406);
        return;
      }
    }
  });

  return;

  //reponse
};
