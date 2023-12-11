const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  MONGODB_CONNECTION_URL: process.env.MONGODB_CONNECTION_URL,
};
