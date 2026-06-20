import "dotenv/config";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.MAIL_FROM,
  to: "juan@ejemplo.com",
  subject: "🧾 Tu factura de compra — Tienda Icaro",
  text: "Hola Juan! Adjuntamos la factura de tu compra reciente en Tienda Icaro.",
  html: `
    <div style="font-family:Arial,sans-serif; max-width:600px; margin:0 auto;">
      <h2 style="color:#2563eb;">¡Gracias por tu compra!</h2>
      <p>Hola <strong>Juan</strong>, adjuntamos la factura correspondiente a tu pedido.</p>
      <p style="color:#64748b;">Número de factura: <strong>FAC-2024-00123</strong></p>
      <p style="color:#64748b;">Total: <strong>$815.996</strong></p>
      <hr style="border:1px solid #e2e8f0;">
      <p style="font-size:12px; color:#94a3b8;">
        Para consultas: soporte@tienda-icaro.com
      </p>
    </div>
  `,

  // ─── Adjuntos ────────────────────────────────────────────────────
  attachments: [
    {
      // Adjunto 1: archivo de texto simulando una factura
      // En producción sería un PDF generado dinámicamente
      filename: "factura-FAC-2024-00123.txt",
      path: join(__dirname, "assets", "factura.txt"),
      contentType: "text/plain",
    },
    {
      // Adjunto 2: contenido generado directamente en memoria
      // Útil cuando no querés guardar el archivo en disco primero
      filename: "resumen.txt",
      content: `Resumen de compra\nFecha: ${new Date().toLocaleDateString("es-AR")}\nTotal: $815.996`,
      contentType: "text/plain",
    },
  ],
};

async function main() {
  try {
    await transporter.verify();
    const info = await transporter.sendMail(mailOptions);
    console.log("   messageId:", info.messageId);
  } catch (error) {
    console.error("\n❌ Error:", error.message);
  }
}
main();
