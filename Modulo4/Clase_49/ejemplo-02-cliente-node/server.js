import { time } from "console";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("cliente conectado al servidor: ", socket.id);

  socket.on("message", ({ text, timestamp }) => {
    console.log(
      `servidor recibio ${text} enviado a las: ${new Date(timestamp).toLocaleTimeString()}`,
    );
    socket.emit("message", {
      text: `Servidor recibio: ${text}`,
      timestamp: Date.now(),
    });
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

const PORT = 3002;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
