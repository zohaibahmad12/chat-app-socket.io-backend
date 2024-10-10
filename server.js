import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import userRoutes from "./routes/userRoutes.js";
import { setupSocketConfig } from "./socket/setupSocketConfig.js";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use("/user", userRoutes);
setupSocketConfig(io);

app.get("/", (req, res) => {
  res.send("Hello From Server");
});
server.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
