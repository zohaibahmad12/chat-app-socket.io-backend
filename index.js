import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {};
app.get("/", (req, res) => {
  res.send("Hello From Server");
});

io.on("connection", (socket) => {
  console.log("A new user make a web socket connection", socket.id);
  const { email } = JSON.parse(socket.handshake.query.user);
  userSocketMap[email] = socket.id;
  socket.broadcast.emit("newUserConnected", { email });

  socket.on("disconnect", (reason) => {
    socket.broadcast.emit("existingUserDisconnected", { email });
    console.log("disconnected", socket.id);
  });
});
server.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
