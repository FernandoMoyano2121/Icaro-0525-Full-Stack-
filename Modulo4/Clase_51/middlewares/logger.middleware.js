export function logPeticion(req, res, next) {
  const inicio = Date.now();

  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    const duracionMs = Date.now() - inicio;
    const emoji = res.statusCode >= 400 ? "❌" : "✅";

    console.log(
      `${emoji} [${timestamp}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duracionMs}ms)`,
    );
  });

  next();
}
