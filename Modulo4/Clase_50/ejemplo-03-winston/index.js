import express from "express";
import morgan from "morgan";
import winston from "winston";

const app = express();
const PORT = 3002;

// =====================================================================
// 🎨 winston.addColors() — Paleta de colores por nivel de log
// =====================================================================
// 🗣️ Winston no aplica colores automáticamente a los niveles: hay que
//    decirle explícitamente qué color usar para cada uno. Esto solo
//    tiene efecto visual en la consola (gracias al format.colorize()
//    que se configura más abajo); no afecta el archivo de log ni la
//    lógica de la app.
winston.addColors({
  error: "red",
  warn: "yellow",
  info: "blue",
  http: "magenta",
  debug: "green",
});

// =====================================================================
// 📝 winston.createLogger() — Instancia principal del logger
// =====================================================================
// 🗣️ createLogger() arma UN objeto logger reutilizable en toda la app.
//    Se configura una sola vez acá y después se usa (logger.info(),
//    logger.error(), etc.) en cualquier parte del archivo.
const logger = winston.createLogger({
  // =====================================================================
  // 📝 winston.createLogger() — Instancia principal del logger
  // =====================================================================
  // 🗣️ createLogger() arma UN objeto logger reutilizable en toda la app.
  //    Se configura una sola vez acá y después se usa (logger.info(),
  //    logger.error(), etc.) en cualquier parte del archivo.
  level: "debug",
  // 🗣️ format: cadena de transformaciones que se le aplica a CADA log
  //    antes de mostrarlo/guardarlo. combine() las ejecuta en orden:
  format: winston.format.combine(
    // 🗣️ 1) colorize: pinta el texto según los colores definidos arriba
    winston.format.colorize({ all: true }),
    // 🗣️ 2) timestamp: agrega la fecha/hora con el formato indicado
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    // 🗣️ 3) printf: define el formato final de salida como texto plano,
    //    usando los campos ya generados por los formatters anteriores
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} - [${level}] - ${message}`;
    }),
  ),
  // 🗣️ transports: A DÓNDE se envían los logs. Acá solo hay uno
  //    (Console), pero se podrían sumar más en paralelo, por ejemplo
  //    new winston.transports.File({ filename: "app.log" }) para
  //    además guardarlos en disco (como se ve en ejemplo-04).
  transports: [new winston.transports.Console()],
});

// =====================================================================
// 🔗 MORGAN → WINSTON — Logs automáticos de cada request HTTP
// =====================================================================
// 🗣️ Morgan genera una línea de log por cada request entrante (método,
//    URL, status, tiempo de respuesta). En vez de imprimirla directo
//    en consola, la redirigimos al logger de Winston usando "stream",
//    para que pase por el mismo formato (colores, timestamp, etc.)
//    y quede unificada con el resto de los logs de la app.
app.use(
  morgan("dev", {
    stream: { write: (msg) => logger.http(msg.trim()) },
  }),
);

// =====================================================================
// 📍 GET /ping — Endpoint de salud
// =====================================================================
// 🗣️ Ruta simple para verificar que el servidor está vivo. Registra un
//    log de nivel "info" cada vez que se recibe una request.
app.get("/ping", (req, res) => {
  logger.info("request recibida");
  res.send("Pong");
});

app.listen(PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});

// =====================================================================
// 📍 GET /users — Lista de usuarios (mock)
// =====================================================================
// 🗣️ Nota: aunque esta ruta está definida DESPUÉS de app.listen(), sigue
//    funcionando igual: app.get() solo registra el handler en la tabla
//    de rutas de Express, mientras que app.listen() arranca el servidor
//    HTTP. Son dos cosas independientes. Aun así, por prolijidad y
//    legibilidad, conviene declarar TODAS las rutas antes de app.listen().
app.get("/users", (_req, res) => {
  logger.info("Listando usuarios");
  res.json([
    { id: 1, name: "Ana" },
    { id: 2, name: "Bruno" },
  ]);
});

// =====================================================================
// 📍 GET /error-demo — Simulación de error no controlado
// =====================================================================
// 🗣️ Este endpoint registra el error en el logger y LUEGO lo lanza con
//    throw. Como no hay un middleware de manejo de errores (4 parámetros:
//    err, req, res, next) definido en este archivo, Express usa su
//    manejador de errores por defecto, que responde con status 500
//    y un stack trace en texto plano (no JSON). Para una respuesta
//    controlada como en ejemplo-04, habría que agregar un middleware
//    tipo app.use((err, _req, res, _next) => {...}).
app.get("/error-demo", (_req, _res) => {
  // Simulamos un error para ver cómo se ve en el log
  logger.error("Algo salió muy mal en /error-demo");
  throw new Error("Error de prueba");
});
