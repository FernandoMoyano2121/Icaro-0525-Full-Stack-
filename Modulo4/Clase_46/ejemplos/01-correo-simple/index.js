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

export default transporter;

async function verificarConexion() {
  console.log("Verificando conexion a servidor SMTP");
  try {
    await transporter.verify();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

const mailOptions = {
  from: process.env.MAIL_FROM,
  to: "alumno@ejemplo.com",
  subject: "¡Bienvenido a Tienda Icaro!",
  text: `
Hola!

Gracias por registrarte en Tienda Icaro.
Tu cuenta fue creada exitosamente.

Si no creaste esta cuenta, ignorá este mensaje.

Saludos,
El equipo de Tienda Icaro
  `,
};

async function enviarCorreo() {
  transporter.sendMail(mailOptions);
}

async function main() {
  try {
    await verificarConexion();
    await enviarCorreo();
  } catch (error) {
    console.log(error.message);
  }
}

main();
