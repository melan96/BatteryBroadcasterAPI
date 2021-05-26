const Joi = require("@hapi/joi");

const authSchema = Joi.object({
  username: Joi.string().min(4).max(15).alphanum().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const loginSchema = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required(),
});
module.exports = {
  authSchema,
  loginSchema,
};
