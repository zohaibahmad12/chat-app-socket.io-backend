import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { setupSocketConfig } from "./socket/setupSocketConfig.js";
import { configDotenv } from "dotenv";
import connectDB from "./dbConnection.js";
import cors from "cors";

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
configDotenv();
connectDB();
app.use(express.json());

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
setupSocketConfig(io);

app.get("/", (req, res) => {
  res.send("Hello From Server");
});
server.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
