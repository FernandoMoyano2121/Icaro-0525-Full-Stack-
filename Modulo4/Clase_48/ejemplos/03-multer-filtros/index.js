import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { promises as fs } from "fs";

// ============================================================
// ⚙️ CONFIGURACIÓN INICIAL
// ============================================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

const UPLOADS_DIR = path.join(__dirname, "uploads");
await fs.mkdir(UPLOADS_DIR, { recursive: true });

// ============================================================
// 💾 CONFIGURACIÓN DE STORAGE (multer.diskStorage)
// ============================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const nombreBase = path.basename(file.originalname, extension);
    const nombreFinal = `${Date.now()}-${nombreBase}${extension}`;
    cb(null, nombreFinal);
  },
});

const fileFilter = (req, file, cb) => {
  const tiposPermitidos = ["image/png", "image/jpeg"];

  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `ipo de archivo no peremitido ${file.mimetype} Solo se aceptan imagenes JPEG y PNG`,
      ),
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, //2mb
  },
});

app.post("/upload", upload.single("imagen"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se escribio ningun archivo" });
  }

  res.status(201).json({
    mensaje: "Imagen recibida",
    nombreOriginal: req.file.originalname,
    nombreGuardado: req.file.filename,
    tipo: req.file.mimetype,
    tamaño: `${(req.file.size / 1024).toFixed(2)} KB`,
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor en http://localhost:${PORT}`);
});
