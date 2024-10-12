const userSocketMap = {};
export const setupSocketConfig = (io) => {
  io.on("connection", (socket) => {
    console.log("A new user make a web socket connection", socket.id);
    if (!socket.handshake.query.user) return;
    const { email } = JSON.parse(socket.handshake.query.user);
    userSocketMap[email] = socket.id;
    socket.broadcast.emit("newUserConnected", { email });

    socket.on("disconnect", (reason) => {
      socket.broadcast.emit("existingUserDisconnected", { email });
      console.log("disconnected", socket.id);
    });
  });
};
