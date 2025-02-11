import { Router } from "express";
import { check } from "express-validator";
import { getUsers , getUserById, updateUser, deleteUser, trueUser, updatePassword} from "./user.controller.js";
import { existeUsuarioById } from "../helpers/db-validator.js";
import { validarCampos} from "../middlewares/validar-campos.js"
import { uploadProfilePicture } from "../middlewares/multer-upload.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";

const router = Router();

router.get("/",getUsers);

router.get(
    "/findUser/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    getUserById
)

router.put(
    "/:id",
    uploadProfilePicture.single('profilePicture'),
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    updateUser
)

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE"),
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    deleteUser

)

router.put(
    "/password/:id",
   
    [
        check("id", "No es ID válido").isMongoId(),
        check("id").custom(existeUsuarioById),
        check("password", "La contraseña es obligatoria y debe tener mínimo 6 caracteres").isLength({ min: 6 }),
        validarCampos
    ],
    updatePassword
);
 

router.put(
    "/activate/:id",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE"),
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    trueUser
    
)
export default router;
