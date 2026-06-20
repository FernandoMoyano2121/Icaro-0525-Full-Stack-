import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST, // servidor SMTP (ej: sandbox.smtp.mailtrap.io)
  port: process.env.MAIL_PORT, // puerto (2525 Mailtrap / 587 Gmail con TLS)
  auth: {
    user: process.env.MAIL_USER, // usuario SMTP
    pass: process.env.MAIL_PASS, // contraseña o app password
  },
});

const htmlBody = `

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

  <!-- Contenedor principal -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:30px 0;">
    <tr>
      <td align="center">

        <!-- Tarjeta del correo -->
        <table width="600" cellpadding="0" cellspacing="0"
               style="background-color:#ffffff; border-radius:8px; overflow:hidden;
                      box-shadow:0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background-color:#2563eb; padding:30px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px;">🛒 Tienda Icaro</h1>
            </td>
          </tr>

          <!-- Cuerpo -->
          <tr>
            <td style="padding:40px 30px;">
              <h2 style="color:#1e293b; margin-top:0;">¡Bienvenido, Juan!</h2>
              <p style="color:#475569; line-height:1.6;">
                Gracias por registrarte en <strong>Tienda Icaro</strong>.
                Tu cuenta fue creada exitosamente y ya podés comenzar a explorar
                nuestros productos.
              </p>

              <!-- Separador -->
              <hr style="border:none; border-top:1px solid #e2e8f0; margin:24px 0;">

              <!-- Datos de la cuenta -->
              <p style="color:#475569; margin-bottom:8px;"><strong>Email:</strong> juan@ejemplo.com</p>
              <p style="color:#475569; margin-top:0;"><strong>Fecha:</strong> ${new Date().toLocaleDateString("es-AR")}</p>

              <!-- Botón CTA -->
              <div style="text-align:center; margin-top:32px;">
                <a href="http://localhost:3000"
                   style="background-color:#2563eb; color:#ffffff; padding:14px 32px;
                          border-radius:6px; text-decoration:none; font-weight:bold;
                          display:inline-block;">
                  Ver mis productos
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc; padding:20px 30px; text-align:center;
                       border-top:1px solid #e2e8f0;">
              <p style="color:#94a3b8; font-size:12px; margin:0;">
                Si no creaste esta cuenta, ignorá este mensaje.<br>
                © 2024 Tienda Icaro — Todos los derechos reservados.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

const mailOptions = {
  from: process.env.MAIL_FROM,
  to: "alumno@ejemplo.com",
  subject: "¡Bienvenido a Tienda Icaro!",
  text: "Hola Juan! Gracias por registrarte en Tienda Icaro. Tu cuenta fue creada exitosamente.",
  html: htmlBody,
};

async function main() {
  try {
    await transporter.verify();
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
}

main();
