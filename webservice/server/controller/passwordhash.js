const bcrypt = require("bcryptjs");
const saltCycles = 5;
exports.hashPasswordBc = (password) => bcrypt.hash(password, saltCycles);
