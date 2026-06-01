import express from "express";
import cors from "cors";
import session from "express-session";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    credentials: true,
  }),
);

app.use(
  session({
    secret: "miClaveSecreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // false porque estamos en HTTP
      sameSite: "lax", // 'lax' funciona en mismo origen
      maxAge: 60000,
    },
  }),
);

//--------------------------------------------------------
// LOGIN: Guarda datos en la sesión del servidor
// http://localhost:3000/session/login
//--------------------------------------------------------
app.post("/session/login", (req, res) => {
  const { usuario } = req.body;

  if (!usuario) {
    return res.status(400).json({ error: "El usuario es requerido" });
  }

  // Guarda en el SERVIDOR, no en la cookie
  req.session.usuario = usuario;

  res.json({ message: `Sesión iniciada para: ${usuario}` });
});

//-------------------------------------------------------------
// DASHBOARD: Verifica si hay sesión activa
// http://localhost:3000/session/dashboard
//-------------------------------------------------------------
app.get("/session/dashboard", (req, res) => {
  if (!req.session.usuario) {
    return res
      .status(401)
      .json({ error: "No autorizado - Sesión no encontrada" });
  }

  res.json({
    mensaje: `¡Bienvenido ${req.session.usuario}! (express-session)`,
  });
});

//----------------------------------------------------------------
// LOGOUT: Destruye la sesión
// http://localhost:3000/session/logout
//----------------------------------------------------------------
app.delete("/session/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error al cerrar sesión" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Sesión destruida" });
  });
});

//--------------------------------------------------------------
// Escucha del servidor
//--------------------------------------------------------------
app.listen(3000, () => {
  console.log("Servidor: http://localhost:3000");
});
