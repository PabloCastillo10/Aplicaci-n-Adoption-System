import { Router } from "express";
import { check } from "express-validator";
import { saveCita } from "./cita.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        check('email', 'Este no es un correo valido').not().isEmpty(),
        check('name', 'Esta Mascota no existe').not().isEmpty(),
        validarCampos
    ],
    saveCita
)

export default router;