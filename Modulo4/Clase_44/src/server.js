// Aquí integramos Express con mysql2: cada endpoint HTTP dispara una query
// a la base de datos usando async/await dentro de un try/catch.
//
// ENDPOINTS IMPLEMENTADOS:
// ─────────────────────────────────────────────────────────────────────────────
//  GET    /api/categorias                → Listar todas las categorías
// ─────────────────────────────────────────────────────────────────────────────
//
// TESTING con Thunder Client:
//  1. Instalar extensión Thunder Client en VSCode
//  2. Crear colección "Tienda API"
//  3. Probar cada endpoint en el orden de los comentarios
// =============================================================================

import express from "express";
import pool from "../db/conexion.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en el body de los requests
app.use(express.json());

// =============================================================================
// ==================  RUTAS DE CATEGORÍAS  ===================================
// =============================================================================

app.get("/api/categorias", async (req, res) => {
  try {
    const [categorias] = await pool.execute(
      "SELECT * FROM categorias ORDER BY nombre",
    );
    res.json({ ok: true, data: categorias, total: categorias.length });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(` 🚀 Servidor corriendo en http://localhost:${PORT}`);
});
