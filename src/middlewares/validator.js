import {body } from "express-validator";
import { validarCampos } from "./validar-campos";
import { existenteEmail } from "../helpers/db-validator";

export const validarRegistro = [
    body("name", 'The nameis required').not().isEmpty(),
    body("username",'The Surname is required').not().isEmpty(),
    body("email", 'You must enter a valid email').isEmail(),
    body("email").custom(existenteEmail),
    body("password", 'Password must be at least 8 characters ').isLength({ min: 8 }),
    validarCampos,
];

export const loginValidator = [
    body("email").optional.isEmail().withMessage("Enter a valid email address"),
    body("username").optional.isEmail().withMessage("Enter valid username"),
    body("password", 'Password must be at least 8 characteres').isLength({ min: 8}),
    validarCampos
]