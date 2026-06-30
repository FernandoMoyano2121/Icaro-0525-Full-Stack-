import { io } from "socket.io-client";

const socket = io("http://localhost:3002", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Conectado al servidor con el ID: ", socket.id);

  socket.emit("message", {
    text: "Hola desde el cliente Node",
    timestamp: Date.now(),
  });

  console.log(" ✅ Mensaje enviado! ");
});

socket.on("message", ({ text, timestamp }) => {
  `Recibido: "${text}" a las ${new Date(timestamp).toLocaleTimeString()}`;

  socket.disconnect();
});

socket.on("connect_error", (err) => {
  console.log(err.message);
});

socket.on("disconnect", () => {
  console.log("Desconectado");
});
