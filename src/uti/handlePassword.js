const bcrypt = require("bcrypt");
const SALT = 10;
const hashPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, SALT);
  return hashPassword;
};

const checkPassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

module.exports = { hashPassword, checkPassword };
