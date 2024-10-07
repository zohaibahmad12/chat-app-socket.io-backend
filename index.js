import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server);
app.get("/", (req, res) => {
  res.send("Hello From Server");
});

io.on("connection", (socket) => {
  console.log("A new user make a web socket connection");
});
server.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
