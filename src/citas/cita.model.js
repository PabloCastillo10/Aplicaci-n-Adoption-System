import { model, Schema } from "mongoose";

const CitaSchema = Schema({
        fecha: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        pet : {
            type: Schema.Types.ObjectId,
            ref: 'pet',
            required: true,
        },
        description : {
            type: String,
            required: true,
        },
        status: {
            type : Boolean,
            default: true,
        },
        
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export default model('cita', CitaSchema);