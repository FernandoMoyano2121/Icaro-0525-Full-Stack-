import * as usuarioService from "../services/usuario.service.js";

export async function crear(req, res) {
  try {
    // Verificamos si el email ya está registrado antes de intentar insertar
    const existe = await usuarioService.obtenerPorEmail(req.body.email);

    if (existe) {
      return res.status(409).json({ error: "El email ya está registrado." });
    }

    const nuevoUsuario = await usuarioService.crear(req.body);
    res
      .status(201)
      .json({ mensaje: "✅ Usuario creado.", usuario: nuevoUsuario });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el usuario.", detalle: error.message });
  }
}
