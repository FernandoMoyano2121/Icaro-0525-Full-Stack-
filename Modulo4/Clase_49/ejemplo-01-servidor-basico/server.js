import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const PORT = 3001;

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Usuario conectado: ", socket.id);

  socket.on("chat message", (msg) => {
    console.log(`Mensaje de ${socket.id}: ${msg}`);

    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log("Esperando por conexiones WebSocket...");
});
