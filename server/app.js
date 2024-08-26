const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const ACTIONS = require("../src/ACTIONS.js");
// import { ACTIONS } from "./ACTIONS.js";
app.use(cors());
var names = [];
const io = new Server(server);
function getAllConnectedClients(roomid) {
  names = [];
  return Array.from(io.sockets.adapter.rooms.get(roomid) || []).map(
    (socketid) => {
      console.log(socketid, roomid);
      names.push(userSocketMap[socketid]);
      return {
        socketid,
        username: userSocketMap[socketid],
      };
    }
  );
}
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on(ACTIONS.JOIN, (roomid, username) => {
    // console.log("in action join");
    // console.log(roomid.roomid);
    // console.log(roomid.username);

    userSocketMap[socket.id] = roomid.username;
    socket.join(roomid.roomid);
    var userName = roomid.username;

    const clients = getAllConnectedClients(roomid.roomid);
    console.log(clients);
    console.log(names);

    clients.forEach(({ socketid }) => {
      io.to(socketid).emit(ACTIONS.JOINED, {
        clients,
        userName,
        socketId: socketid,
      });
    });
  });
  socket.on("disconnecting", () => {
    const rooms = { ...socket.rooms };
    rooms.forEach((roomid) => {
      socket.in(roomid).emit(ACTIONS.DISCONNECTED, {
        socketid: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
  socket.on(ACTIONS.CODE_CHANGE, ({ roomid, code }) => {
    console.log(code);
    io.on(ACTIONS.CODE_CHANGE, { code });
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`listening on port ${PORT}`));
