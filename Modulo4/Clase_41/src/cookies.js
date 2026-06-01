import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    credentials: true,
  }),
);

//------------------------------------------------------------------------------
// LOGIN: Crea una cookie con el nombre del usuario
// http://localhost:3000/cookie/login
//------------------------------------------------------------------------------
app.post("/cookie/login", (req, res) => {
  const { usuario } = req.body;

  if (!usuario) {
    return res.status(400).json({ error: "El usuario es requerido" });
  }

  // Crear cookie - se guarda EN EL NAVEGADOR del cliente
  res.cookie("usuario", usuario, {
    maxAge: 60000, // 1 minuto
    httpOnly: true, // No accesible desde JS del cliente
    secure: false, // Requerido para sameSite: 'none'
    sameSite: "lax", // Permite cross-origin (Live Server → Express)
  });

  res.json({ message: `Cookie creada para: ${usuario}` });
});

//-----------------------------------------------------------------------
// DASHBOARD: Lee la cookie para verificar si hay "sesión"
// http://localhost:3000/cookie/dashboard
//-----------------------------------------------------------------------

app.get("/cookie/dashboard", (req, res) => {
  const usuario = req.cookies.usuario;

  if (!usuario) {
    return res
      .status(401)
      .json({ error: "No autorizado - Cookie no encontrada" });
  }

  res.json({ mensaje: `¡Bienvenido ${usuario}! (cookie manual)` });
});

//----------------------------------------------------------------------
// LOGOUT: Elimina la cookie
// http://localhost:3000/cookie/logout
//----------------------------------------------------------------------
app.delete("/cookie/logout", (req, res) => {
  res.clearCookie("usuario");
  res.json({ message: "Cookie eliminada" });
});

//-----------------------------------------------------------------------
// VER: Muestra todas las cookies recibidas
// http://localhost:3000/cookie/ver
//-----------------------------------------------------------------------
app.get("/cookie/ver", (req, res) => {
  console.log("Cookies recibidas:", req.cookies);
  res.json({ cookies: req.cookies });
});

//--------------------------------------------------------------
// Escucha del servidor
//--------------------------------------------------------------
app.listen(3000, () => {
  console.log("Servidor: http://localhost:3000");
});
