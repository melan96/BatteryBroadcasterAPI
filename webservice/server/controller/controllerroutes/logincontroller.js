const mongoose = require("mongoose");
const usermodel = require("../../models/usermodel.js");
const bcrypt = require("bcrypt");

const passwordCryptCheck = (password, crypt) => {
  return bcrypt.compareSync(password, crypt);
};

exports.LoginController = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userdump = usermodel;
  await userdump.find({ username: username }, (err, document) => {
    if (err) {
      console.log(err);
      res.send(err).status(422);
    } else {
      if (document.length == 0 || document.length == null) {
        res.send("cannot find the user by " + username).status(422);
      } else {
        if (passwordCryptCheck(password, document[0]["password"])) {
          res.send(document).status(200);
        } else {
          res.send({ message: "password not match with user" }).status(404);
        }
      }
    }
  });

  res.sendStatus(200);

  //reponse
};
