import { hash, verify } from 'argon2';
import Usuario from '../users/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    
    const { email, password, username } = req.body;

    try {

        const loweEmail = email ? email.toLowerCase() : null;
        const loweUsername = username? username.toLowerCase() : null;
        
        const user = await Usuario.findOne({
            $or: [{ email: loweEmail }, { username: loweUsername }]
        });

        if (!user) {
            return res.status(404).json({
                msg: 'Credenciales incorrectas, Correo no existe en la base de datos'
            });
        }

        if (!user.estado) {
            return res.status(400).json({
                msg: 'El user no existe en la base de datos'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            });
        }

        const token = await generarJWT(user.id);

        return res.status(200).json({
            msg: 'Inicion de sesion exitoso',
            userDetails: {
                username: user.username,
                token: token,
                profilePicture : user.profilePicture,
            }
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            msg : "Server error:",
            error: e.message
        });
    }

}

export const register = async (req, res) => {
    try {
        const data = req.body;

        let profilePicture =  req.file ?  req.file.filename : null;

        const encryptedPassword = await hash(data.password);

        const newUser = new Usuario({
            name: data.name,
            surname: data.surname,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: encryptedPassword,    
            role: data.role,
            profilePicture: profilePicture
        });

       

    } catch (error) {
        console.log(error);
       return  res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }

}