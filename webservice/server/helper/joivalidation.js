const Joi = require("@hapi/joi");

const authSchema = Joi.object({
  username: Joi.string().min(4).max(15).alphanum().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

module.exports = {
  authSchema,
};
