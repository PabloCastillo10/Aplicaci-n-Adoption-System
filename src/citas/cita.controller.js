import User from '../users/user.model.js'
import Pet from '../pet/pet.model.js'
import Cita from './cita.model.js'


export const saveCita = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email }); 
        const pet = await Pet.findOne({ name: data.name }); 

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'Propietario no encontrado'
            });
        }

        if (!pet) {
            return res.status(404).json({
                success: false,
                msg: 'Mascota no encontrada'
            });
        }

        const cita = new Cita({
            ...data,
            pet: pet._id,
            user: user._id
        });

        await cita.save();

        return res.status(200).json({
            success: true,
            msg: 'Cita agendada con éxito',
            cita
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Error al agendar cita',
            error
        });
    }
};