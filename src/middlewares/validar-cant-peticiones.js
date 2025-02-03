import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    message: {
        succes: false,
        msg: "Demasiadas peticiones desde esta IP, por favor intente nuevamente despues de 15 minutos"
    }
});

export const loginValidator = [
    body("email").optional.isEmail().withMessage("Enter a valid email address"),
    body("username").optional.isEmail().withMessage("Enter a valid username"),
    body("password", 'Password must be at least 8 characteres').isLength({ min: 8}),
    validarCampos,
]