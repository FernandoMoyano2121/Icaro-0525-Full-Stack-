import "dotenv/config";
import nodemailer from "nodemailer";
import fs from "fs/promises";
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

const usuario = {
  nombre: "María González",
  email: "maria@ejemplo.com",
  fecha: new Date().toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
};

async function cargarPlantilla(rutaPlantilla, datos) {
  let html = await fs.readFile(rutaPlantilla, "utf-8");
  html = html.replaceAll("{{nombre}}", datos.nombre);
  html = html.replaceAll("{{email}}", datos.email);
  html = html.replaceAll("{{fecha}}", datos.fecha);

  return html;
}

async function main() {
  try {
    await transporter.verify();
    const rutaPlantilla = join(__dirname, "template", "bienvenida.html");
    const htmlPersonalizado = await cargarPlantilla(rutaPlantilla, usuario);

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: usuario.email,
      subject: `¡Bienvenida, ${usuario.nombre}! Tu cuenta está lista 🎉`,
      text: `Hola ${usuario.nombre}! Tu cuenta en Tienda Icaro fue creada el ${usuario.fecha}.`,
      html: htmlPersonalizado, // ← HTML con las variables ya reemplazadas
    };

    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
}

main();
