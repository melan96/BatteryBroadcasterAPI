const bcrypt = require("bcrypt");
const saltCycles = 5;
exports.hashPasswordBc = (password) => bcrypt.hash(password, saltCycles);
