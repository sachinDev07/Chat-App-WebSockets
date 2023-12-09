document.addEventListener("DOMContentLoaded", function () {
  console.log("Welcome to the web sockets");
  var socket = io();

  // let btn = document.getElementById('button');
  // btn.addEventListener("click", function() {
  //     socket.emit("from_client");
  // })

  // socket.on('from_server', function() {
  //     let div = document.getElementById('from_server');
  //     let p = document.createElement('p');
  //     p.textContent = "Message from the server";
  //     div.appendChild(p);
  // })

  // socket.emit('from_client')





  let input = document.getElementById("input");
  let msgList = document.getElementById("msg_list");
  let sendBtn = document.getElementById("btn");

  sendBtn.addEventListener("click", function () {
    let msg = input.value;
    socket.emit("new_msg", {
        message: msg
    })
    input.value = "";
  });

  socket.on("msg_rcvd", function(data) {
    let msg = document.createElement('li');
    msg.textContent = data.message;
    msgList.appendChild(msg);
  })

});
