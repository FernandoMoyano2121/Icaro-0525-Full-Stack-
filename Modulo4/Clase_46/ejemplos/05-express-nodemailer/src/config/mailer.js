import "dotenv/config";
import nodemailer from "nodemailer";

// Crear el transporter una sola vez y exportarlo
// Todos los módulos que necesiten enviar correos importan ESTE objeto
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export default transporter;
