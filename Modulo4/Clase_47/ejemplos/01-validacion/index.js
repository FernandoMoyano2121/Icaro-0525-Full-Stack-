import express from "express";
import { body, validationResult } from "express-validator";

const app = express();
const PORT = 3000;

app.use(express.json());

const reglasRegsitro = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 3, max: 40 })
    .withMessage("El nombre debe tener entre 3 y 40 caracteres"),

  body("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("El email no tiene un formato valido"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres."),

  body("edad")
    .optional()
    .isInt({ min: 18, max: 100 })
    .withMessage("La edad debe ser un número entero entre 18 y 120."),

  body("username")
    .notEmpty()
    .withMessage("El username es requerido")
    .custom((valor) => {
      // 🗣️ La regex /^[a-zA-Z0-9_]+$/ solo acepta letras, números y guión bajo
      if (!/^[a-zA-Z0-9_]+$/.test(valor)) {
        throw new Error(
          "El username solo puede contener letras, números y guion bajo.",
        );
      }
      return true;
    }),
];

app.post("/registro", reglasRegsitro, (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: "Los datos enviados no son validos",
      errores: errores.array(),
    });
  }

  const { nombre, email, username } = req.body;
  res.status(201).json({
    mensaje: "Datos validos usaurio creado!",
    usuario: { nombre, email, username },
  });
});

app.listen(PORT, () => {
  console.log(`\nServidor corriendo en http://localhost:${PORT}`);
});
