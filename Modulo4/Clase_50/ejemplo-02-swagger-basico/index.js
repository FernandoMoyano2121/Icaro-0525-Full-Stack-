import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();
const PORT = 3001;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /ping:
 *   get:
 *    tags:
 *       - Salud
 *    summary: Verifica que el servidor responde
 *    responses:
 *      "200":
 *        description: El servidor está activo y responde "pong"
 */
app.get("/ping", (req, res) => {
  res.send("Pong");
});

app.listen(PORT, () => {
  console.log(`servidor corriendo en : http://localhost:${PORT}`);
  console.log(`Documentacion disponible en http://localhost:${PORT}/api-docs`);
});
