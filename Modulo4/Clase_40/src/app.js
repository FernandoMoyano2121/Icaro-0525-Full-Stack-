import express from "express";
import { logger } from "./middlewares/logger.js";
import { authRoute } from "./middlewares/authRoute.js";
import { mockAuth } from "./middlewares/mockAuth.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { checkApiKey } from "./middlewares/checkApiKey.js";

const app = express();
app.use(express.json());
app.use(logger);

/* Ejemplo 1______________________________________________ */
app.get("/", (req, res) => res.status(200).send("Hola Mundo"));

app.post("/", (req, res) => {
  const { nombre, edad, ciudad } = req.body;
  return res.status(200).json({
    nombre: nombre,
    edad: edad,
    ciudad: ciudad,
  });
});

/* Ejemplo 2______________________________________________ */
/* app.use(mockAuth);
app.get("/admin/dashboard", authRoute, (req, res) => {
  res.send("Panel de administrador");
}); */

/* Ejemplo 3______________________________________________ */
app.get("/productos/:id", (req, res, next) => {
  const id = req.params.id;
  if (isNaN(id)) {
    const error = new Error("ID no valido");
    error.statusCode = 400;
    return next(error);
  }

  const producto = null;

  if (!producto) {
    const error = new Error("producto no encontrado");
    error.statusCode = 404;
    return next(error);
  }
});

/* Ejemplo 4______________________________________________ */
/* app.get("/secret", checkApiKey, (req, res) => {
  res.send("Esto es un secreto");
}); */

app.use(errorHandler);

app.listen(3000, () =>
  console.log("Servidor corriendo en http://localhost:3000"),
);
