import bcrypt from "bcrypt";
import Usuario from "../database/models/Usuario.js";

const SALT_ROUNDS = 10;

export async function crear(datos) {
  const { nombre, email, password, rol } = datos;
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const nuevoUsuario = await Usuario.create({
    nombre,
    email,
    password: passwordHash, // guardamos el hash, nunca el texto plano
    rol,
  });

  const { password: _, ...usuarioSinPassword } = nuevoUsuario.toJSON();
  return usuarioSinPassword;
}

export const obtenerPorEmail = async (email) => {
  return await Usuario.findOne({ where: { email } });
};
