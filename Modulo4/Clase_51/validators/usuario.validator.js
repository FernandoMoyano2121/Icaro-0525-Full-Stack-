import { body, validationResult } from "express-validator";

export const validarCrearUsuario = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres."),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("Debe ser un email válido."),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres."),

  body("rol")
    .optional() // no es obligatorio enviarlo
    .isIn(["admin", "usuario"])
    .withMessage("El rol debe ser 'admin' o 'usuario'."),
];

export function manejarErroresValidacion(req, res, next) {
  //    validationResult() necesita recibir el req: ahí es donde
  //    express-validator fue guardando los resultados de cada
  //    validación definida en validarCrearUsuario.
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: "Datos invalidos",
      detalles: errors.array(),
    });
  }

  next();
}
