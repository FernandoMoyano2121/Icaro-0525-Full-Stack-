import "dotenv/config";
import express from "express";
import transporter from "./src/config/mailer.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// =============================================================================
// ENDPOINT: GET /health
// Verifica que el servidor está activo y que el SMTP responde.
// Útil para monitoreo y para verificar la configuración antes de la clase.
// =============================================================================
app.get("/health", async (req, res) => {
  try {
    await transporter.verify();
    res.json({
      servidor: "Express funcionando",
      smtp: "Conexion a SMTP Verificada ",
      port: PORT,
    });
  } catch (error) {
    res.status(500).json({
      servidor: "express funcionando",
      smtp: `Error SMTP: ${error.message}`,
    });
  }
});

// =============================================================================
// ENDPOINT: POST /registro
// Recibe los datos del nuevo usuario y envía un correo de bienvenida.
//
// Body esperado:
//   { "nombre": "Juan Pérez", "email": "juan@ejemplo.com" }
//
// Respuestas:
//   201 → correo enviado exitosamente
//   400 → datos faltantes en el body
//   500 → error al enviar el correo
// =============================================================================
app.post("/registro", async (req, res) => {
  const { nombre, email } = req.body;
  // ─── Validación básica ────────────────────────────────────────────
  // En producción usarías una librería como Zod o Joi para esto
  if (!nombre || !email) {
    res.status(400).json({
      error: "Los campos son requeridos",
    });
  }
  // ─── Configurar el correo ─────────────────────────────────────────

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: `¡Bienvenido/a, ${nombre}! Tu cuenta en Tienda Icaro está lista 🛒`,
    // Versión texto plano (fallback)
    text: `Hola ${nombre}! Gracias por registrarte en Tienda Icaro. Tu cuenta está activa.`,
    html: `
      <div style="font-family:Arial,sans-serif; max-width:600px; margin:0 auto;">
        <div style="background-color:#2563eb; padding:24px; text-align:center; border-radius:8px 8px 0 0;">
          <h1 style="color:#fff; margin:0;">🛒 Tienda Icaro</h1>
        </div>
        <div style="padding:32px; background:#fff; border:1px solid #e2e8f0;">
          <h2 style="color:#1e293b; margin-top:0;">¡Bienvenido/a, ${nombre}!</h2>
          <p style="color:#475569; line-height:1.6;">
            Tu cuenta fue creada exitosamente.
            Ya podés explorar todos nuestros productos.
          </p>
          <p style="color:#475569;">
            <strong>Email registrado:</strong> ${email}
          </p>
          <div style="text-align:center; margin-top:24px;">
            <a href="http://localhost:${PORT}/productos"
               style="background:#2563eb; color:#fff; padding:12px 28px;
                      border-radius:6px; text-decoration:none; font-weight:bold;">
              Ver productos →
            </a>
          </div>
        </div>
        <div style="padding:16px; background:#f8fafc; text-align:center;
                    border-radius:0 0 8px 8px; border:1px solid #e2e8f0; border-top:none;">
          <p style="color:#94a3b8; font-size:12px; margin:0;">
            © 2024 Tienda Icaro — Si no creaste esta cuenta, ignorá este mensaje.
          </p>
        </div>
      </div>
    `,
  };
  // ─── Enviar el correo ─────────────────────────────────────────────

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(
      `📧 Correo de bienvenida enviado a ${email} (${info.messageId})`,
    );

    res.status(201).json({
      mensaje: "Registro exitoso",
      messageId: info.messageId,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Error al enviar correo",
      detalle: `${error.message}`,
    });
  }
});

// =============================================================================
// Iniciar el servidor
// =============================================================================
app.listen(PORT, () => {
  console.log(`\n Servidor corriendo en http://localhost:${PORT}`);
  console.log("\nEndpoints disponibles:");
  console.log(`  GET  http://localhost:${PORT}/health   → verificar estado`);
  console.log(
    `  POST http://localhost:${PORT}/registro → registrar usuario y enviar correo`,
  );
});
