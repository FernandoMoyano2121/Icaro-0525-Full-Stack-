import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sequelize from "./database/connection.js";
import usuarioRoutes from "./routes/usuario.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middlewares globales ---
app.use(express.json());

// --- Rutas ---
app.use("/api", usuarioRoutes);

async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log("Conexion exitosa");

    await sequelize.sync({ force: false });
    console.log("Tablas sincronizadas");

    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}/api/usuarios`);
    });
  } catch (error) {
    console.error("Error al iniciar:", error.message);
    process.exit(1);
  }
}

iniciar();
