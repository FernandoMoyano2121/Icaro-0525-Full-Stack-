import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { promises as fs } from "fs";

// ============================================================
// ⚙️ CONFIGURACIÓN INICIAL
// ============================================================
const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const UPLOADS_DIR = path.join(__dirname, "uploads");
console.log(UPLOADS_DIR);

await fs.mkdir(UPLOADS_DIR, { recursive: true });

// ============================================================
// 📂 CONFIGURACIÓN DE MULTER (modo simple con "dest")
// ============================================================

const upload = multer({ dest: UPLOADS_DIR });

app.post("/upload", upload.any(), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No se escribio ningun archivo" });
  }
  const archivo = req.files[0];
  console.log("archivo recibido: ", archivo);

  res.status(201).json({
    mensaje: "Archivo recibido",
    campo: archivo.fieldname,
    nombreGuardado: archivo.filename,
    tipo: archivo.mimetype,
    ruta: archivo.path,
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor en http://localhost:${PORT}`);
});
