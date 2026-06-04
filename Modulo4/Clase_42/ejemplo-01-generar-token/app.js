import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const CLAVE_SECRETA =
  "3c7abd5d75e3b311c2cc5912d67f386ea14f5614baabebbf23f957a42380060a";

// ---------------------------------------------------------------
// BASE DE DATOS SIMULADA: en producción vendría de una BD real.
// ---------------------------------------------------------------
const usuarios = [
  { id: 1, usuario: "fernando", password: "1234" },
  { id: 2, usuario: "ana", password: "abcd" },
];

app.get("/", (req, res) => {
  res.json({ mensaje: "Servidor JWT funcionando ✅" });
});

app.post("/login", (req, res) => {
  // 1. Extraemos los datos del body
  const { usuario, password } = req.body;

  // 2. Buscamos el usuario en nuestra "base de datos"
  const usuarioEncontrado = usuarios.find(
    (u) => u.usuario === usuario && u.password === password,
  );

  // 3. Si no existe, respondemos con error 401
  if (!usuarioEncontrado) {
    return res.status(401).json({ mensaje: "Credenciales inválidas" });
  }

  // 4. Si existe, creamos el PAYLOAD (datos que queremos incluir en el token)
  //    IMPORTANTE: nunca incluir passwords ni datos muy sensibles aquí.
  //    El payload es visible (está en base64), solo la firma es secreta.
  const payload = {
    id: usuarioEncontrado.id,
    usuario: usuarioEncontrado.usuario,
  };

  // 5. Generamos el token con jwt.sign(payload, claveSecreta, opciones)
  //    - payload: los datos a incluir
  //    - CLAVE_SECRETA: con qué se firma (solo el servidor la conoce)
  //    - expiresIn: cuánto tiempo dura el token
  const token = jwt.sign(payload, CLAVE_SECRETA, { expiresIn: "1h" });
  res.json({ token });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
  console.log("Probá POST /login con Thunder Client");
});
