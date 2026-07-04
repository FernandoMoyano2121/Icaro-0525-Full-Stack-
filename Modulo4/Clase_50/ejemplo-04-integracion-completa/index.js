import express from "express";
import jwt from "jsonwebtoken";
import morgan, { format } from "morgan";
import swaggerUi from "swagger-ui-express";
import winston from "winston";
import swaggerSpec from "./config/swagger.js";

const app = express();
const PORT = 3003;
const JWT_SECRET = "clave_secreta_para_clase";

app.use(express.json());

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "blue",
  http: "magenta",
  debug: "green",
});

const cleanIncomingAnsi = winston.format.uncolorize();

const baseFormat = [
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} - [${level}] ${message}`;
  }),
];

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(cleanIncomingAnsi, ...baseFormat),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        cleanIncomingAnsi,
        winston.format.colorize({ all: true }),
        ...baseFormat,
      ),
    }),

    new winston.transports.File({
      filename: "app.log",
      level: "debug",
    }),
  ],
});

// =====================================================================
// MORGAN → Winston
// =====================================================================

app.use(
  morgan("dev", {
    stream: { write: (msg) => logger.http(msg.trim()) },
  }),
);

// =====================================================================
// SWAGGER UI
// =====================================================================

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// =====================================================================
// RUTAS
// =====================================================================

/**
 * @openapi
 * /ping:
 *   get:
 *     tags:
 *       - Salud
 *     summary: Verifica que el servidor responde
 *     responses:
 *       '200':
 *         description: Servidor activo
 */
app.get("/ping", (_req, res) => {
  logger.info("Received ping request");
  logger.debug("Este mensaje solo aparece en desarrollo (level debug)");
  res.send("pong");
});

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Genera un JWT de prueba
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: estudiante
 *     responses:
 *       '200':
 *         description: Token JWT generado
 */
app.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) {
    logger.warn("Intento de login sin username");
    return res.status(400).json({ error: "username requerido" });
  }

  // Generamos un token con expiración de 1 hora
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  logger.info(`Login exitoso para: ${username}`);
  res.json({ token });
});

app.use((err, _req, res, _next) => {
  logger.error(`Error no controlado: ${err.message}`);
  res.status(500).json({ error: "Error interno del servidor" });
});

// =====================================================================
// INICIO DEL SERVIDOR
// =====================================================================

app.listen(PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${PORT}`);
  logger.info(`Documentación: http://localhost:${PORT}/api-docs`);
});
