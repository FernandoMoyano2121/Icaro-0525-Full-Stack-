import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { body } from "express-validator";

const app = express();

const SECRET = process.env.JWT_SECRET || "secreto_de_clase";
const PORT = 3000;

let nextId = 1;
app.use(express.json());

const usuarios = [];

const reglasRegistro = [
  body("nombre").trim().notEmpty().withMessage("El nombre es requerido"),

  body("email")
    // 🗣️ trim() quita espacios al inicio/final
    .trim()
    // 🗣️ normalizeEmail() estandariza el email: "Juan@Gmail.COM" → "juan@gmail.com"
    .normalizeEmail()
    .notEmpty()
    .withMessage("El email es requerido.")
    .isEmail()
    .withMessage("El email no tiene formato válido."),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres."),
];

app.post("/register", reglasRegistro, async (req, res) => {
  const { nombre, email, password } = req.body;

  const existe = usuarios.find((u) => u.email === email);
  if (existe) {
    return res.status(409).json("error: El email ya esta registrado ");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const nuevoUsuario = {
    id: nextId++,
    nombre: nombre,
    email: email,
    password: passwordHash,
  };

  usuarios.push(nuevoUsuario);
  console.log(`Usuario registrado: ${email} | hash:${passwordHash}`);

  res.status(201).json({
    mensaje: "Usuario creado exitosamente",
    usuario: { nombre, email },
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email y contraseña son requeridos." });
  }

  // 🗣️ Buscamos el usuario por email
  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  //Comparamos la contraseña enviada contra el hash guardado
  const passwordValida = await bcrypt.compare(password, usuario.password);
  if (!passwordValida) {
    return res.status(401).json({ error: "Credenciales incorrectas." });
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
    },
    SECRET,
    { expiresIn: "2h" },
  );

  res.json({
    mensaje: "Login exitoso!!",
    token,
  });
});

function verificarToken(req, res, next) {
  // 🗣️ Leemos el header "authorization" (Express lo normaliza a minúsculas)
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Token no proporcionado." });
  }

  // 🗣️ El header viene como "Bearer <token>", nos quedamos solo con el token
  const token = authHeader.split(" ")[1];

  try {
    // 🗣️ verify() decodifica el token y verifica que la firma sea válida
    //    Si el token fue manipulado o expiró, lanza un error
    const payload = jwt.verify(token, SECRET);

    // 🗣️ Guardamos los datos del usuario (id, email) en req.user
    //    para que el controlador de la ruta pueda usarlos
    req.user = payload;

    // 🗣️ Todo OK → pasamos al siguiente middleware o controlador
    next();
  } catch (error) {
    // 🗣️ 403 (Forbidden) → el token existe pero no es válido
    return res.status(403).json({ error: "Token inválido o expirado." });
  }
}

app.get("/perfil", verificarToken, async (req, res) => {
  // 🗣️ req.user.id viene del payload del token que verificamos antes
  const usuario = usuarios.find((u) => u.id === req.user.id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  // 🗣️ Devolvemos los datos del perfil (sin password ni hash)
  res.json({
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor en http://localhost:${PORT}`);
});
