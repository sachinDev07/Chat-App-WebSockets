const mongoose = require("mongoose");
const { MONGODB_CONNECTION_URL } = require("./server-config.js");

const connect = async () => {
  await mongoose.connect(MONGODB_CONNECTION_URL);
};

module.exports = connect;
