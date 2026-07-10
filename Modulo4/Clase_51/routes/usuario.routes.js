import { Router } from "express";
import {
  manejarErroresValidacion,
  validarCrearUsuario,
} from "../validators/usuario.validator.js";
import * as usuarioController from "../controllers/usuario.controller.js";
import { logPeticion } from "../middlewares/logger.middleware.js";

const router = Router();

router.post(
  "/usuarios",
  logPeticion,
  validarCrearUsuario,
  manejarErroresValidacion,
  usuarioController.crear,
);

export default router;
