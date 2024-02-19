// config.js
const MONGO_IP = process.env.MONGO_IP || "mongo";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PWD = process.env.MONGO_PWD;

module.exports = {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PWD,
};
