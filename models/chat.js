const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  content: {
    type: String,
  },
  sender: {
    type: String,
  },
  roomid: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
