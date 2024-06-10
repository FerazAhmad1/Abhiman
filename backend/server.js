const dotenv = require("dotenv");
const http = require("http");
const socket = require("socket.io");
dotenv.config({
  path: "./config.env",
});
const app = require("./app.js");

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("connection establish");
  socket.on("joinroom", (userData) => {
    socket.join(userData.roomId);
    socket.emit("connected");
  });
});
server.listen(3000, () => {
  console.log("running");
});
