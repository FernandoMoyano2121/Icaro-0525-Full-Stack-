// =============================================================
// CLASE 42 - EJEMPLO 4: Interceptor de Axios
// =============================================================
//
// OBJETIVO: Demostrar qué es un interceptor y para qué sirve.
//
// ¿QUÉ ES UN INTERCEPTOR?
// Es una función que se "mete en el medio" de todas las
// peticiones HTTP antes de que salgan o antes de que las
// respuestas lleguen al código.
//
// ¿PARA QUÉ LO USAMOS AQUÍ?
// Cuando el Access Token expira, el servidor responde 401.
//
// Sin interceptor → el usuario vería un error o tendría que
//                   loguearse de nuevo a mano.
//
// Con interceptor  → el frontend detecta el 401, renueva el
//                   token automáticamente y reintenta la
//                   petición. El usuario no se entera de nada.
//
// ESTRUCTURA DEL EJEMPLO:
//   server.js  → backend Express (este archivo)
//   index.html → frontend con Axios + interceptor
//
// PASOS PARA MOSTRAR EN CLASE:
// -------------------------------------------------------------
// 1. npm install
// 2. node server.js
// 3. Abrir en el navegador: http://localhost:3000
//
// RECORRIDO EN CLASE (todo desde el navegador, sin Thunder Client):
//
//    PASO 1 — Hacer login
//    → Escribir usuario "fernando" y password "1234"
//    → Click en "Login"
//    → Aparece el mensaje de bienvenida y los tokens en pantalla
//    → Mostrar en consola del navegador (F12) los logs del interceptor
//
//    PASO 2 — Pedir datos protegidos (token aún válido)
//    → Click en "Pedir datos protegidos"
//    → El Access Token dura 15 segundos (para la demo)
//    → Funciona correctamente, se muestran los datos
//    → En consola: "Interceptor: request sale con token"
//
//    PASO 3 — Esperar 15 segundos y volver a pedir datos
//    → Click nuevamente en "Pedir datos protegidos"
//    → El Access Token ya expiró → el servidor responde 401
//    → EL INTERCEPTOR ACTÚA AUTOMÁTICAMENTE:
//        a) Detecta el error 401
//        b) Llama a /refresh para obtener un nuevo token
//        c) Reintenta la petición original con el nuevo token
//        d) Los datos aparecen igual que antes → el usuario NO vio ningún error
//    → En consola: ver todos los pasos del interceptor logueados
//
//    PASO 4 — Hacer logout
//    → Click en "Logout"
//    → Tokens eliminados
//    → Si se intenta pedir datos → error (sin interceptor que ayude)
//
// =============================================================

import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();

// Habilitamos CORS para que el frontend (index.html) pueda comunicarse
app.use(cors());
app.use(express.json());

// Servimos el archivo index.html cuando se entra a http://localhost:3000
import { readFileSync } from "fs";
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(readFileSync("./index.html"));
});

// ---------------------------------------------------------------
// CLAVES Y ALMACÉN DE REFRESH TOKENS
// ---------------------------------------------------------------
const ACCESS_SECRET = "clave_access";
const REFRESH_SECRET = "clave_refresh";

const refreshTokensValidos = new Set();

// ---------------------------------------------------------------
// USUARIOS SIMULADOS
// ---------------------------------------------------------------
const usuarios = [
  { id: 1, usuario: "fernando", password: "1234" },
  { id: 2, usuario: "ana", password: "abcd" },
];

// ---------------------------------------------------------------
// MIDDLEWARE: verificarAccessToken
// ---------------------------------------------------------------
const verificarAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ mensaje: "Token no proporcionado" });

  const token = authHeader.split(" ")[1];
  try {
    req.usuarioLogueado = jwt.verify(token, ACCESS_SECRET);
    next();
  } catch {
    // 401 es la señal que el interceptor del frontend escucha
    return res
      .status(401)
      .json({ mensaje: "Access token expirado o inválido" });
  }
};

// ---------------------------------------------------------------
// RUTA: POST /login
// ---------------------------------------------------------------
app.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  const encontrado = usuarios.find(
    (u) => u.usuario === usuario && u.password === password,
  );

  if (!encontrado) {
    return res.status(401).json({ mensaje: "Credenciales inválidas" });
  }

  const payload = { id: encontrado.id, usuario: encontrado.usuario };

  // Access Token: 15 segundos para que expire rápido en la demo
  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15s" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

  refreshTokensValidos.add(refreshToken);

  res.json({ accessToken, refreshToken });
});

// ---------------------------------------------------------------
// RUTA PROTEGIDA: GET /datos
// ---------------------------------------------------------------
app.get("/datos", verificarAccessToken, (req, res) => {
  res.json({
    mensaje: "¡Datos privados entregados correctamente! 🔓",
    usuario: req.usuarioLogueado.usuario,
    hora: new Date().toLocaleTimeString(),
  });
});

// ---------------------------------------------------------------
// RUTA: POST /refresh
// El interceptor del frontend llama a esta ruta cuando recibe un 401.
// ---------------------------------------------------------------
app.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken || !refreshTokensValidos.has(refreshToken)) {
    return res
      .status(403)
      .json({ mensaje: "Refresh token inválido o inexistente" });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const nuevoAccessToken = jwt.sign(
      { id: decoded.id, usuario: decoded.usuario },
      ACCESS_SECRET,
      { expiresIn: "15s" }, // 15s para que se pueda volver a demostrar
    );
    res.json({ accessToken: nuevoAccessToken });
  } catch {
    return res.status(403).json({ mensaje: "Refresh token expirado" });
  }
});

// ---------------------------------------------------------------
// RUTA: POST /logout
// ---------------------------------------------------------------
app.post("/logout", (req, res) => {
  const { refreshToken } = req.body;
  refreshTokensValidos.delete(refreshToken);
  res.json({ mensaje: "Logout exitoso 🔒" });
});

// ---------------------------------------------------------------
// INICIO DEL SERVIDOR
// ---------------------------------------------------------------
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
  console.log(
    "Abrí esa URL en el navegador para ver el ejemplo del interceptor",
  );
});
