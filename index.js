const express = require("express");

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const connect = require("./config/db-config.js");

const Group = require("./models/group.js");
const Chat = require("./models/chat.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use("/", express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });

  socket.on("join_room", (data) => {
    console.log("Joining a room", data.roomid);
    socket.join(data.roomid);
  });

  socket.on("new_msg", async (data) => {
    const chat = await Chat.create({
      roomid: data.roomid,
      sender: data.sender,
      content: data.message,
    });
    io.to(data.roomid).emit("msg_rcvd", data);
  });
});

app.get("/chat/:roomid/:user", async (req, res) => {
  const group = await Group.findOne({ _id: req.params.roomid });
  const chats = await Chat.find({ roomid: req.params.roomid });
  res.render("index", {
    roomid: req.params.roomid,
    user: req.params.user,
    groupname: group.name,
    previousmsg: chats,
  });
});

app.get("/group", async (req, res) => {
  res.render("group");
});

app.post("/group", async (req, res) => {
  await Group.create({
    name: req.body.name,
  });
  res.redirect("/group");
});

server.listen(8000, async () => {
  console.log("listening on *:8000");
  await connect();
  console.log("DB connected!");
});
