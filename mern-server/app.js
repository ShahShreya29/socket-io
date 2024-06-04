const { log } = require("console");
const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = require("socket.io")(server);
app.use(express.static(path.join(__dirname, "public")));

let socketConnected = new Set()

io.on("connection", onConnection);

function onConnection(socket) {
  console.log(socket.id);
  socketConnected.add(socket.id)

  io.emit('client-total',socketConnected.size)


  socket.on('disconnected',()=>{
    console.log("socket disconnected" , socket.id);
    socketConnected.delete(socket.id)
    io.emit('client-total',socketConnected.size)
  })

  socket.on("message",(data)=>{
    console.log(data);
    socket.broadcast.emit('messages',data)
  })

  socket.on('feedBack',(data)=>{
    socket.broadcast.emit('feedBack',data)
  })



}
