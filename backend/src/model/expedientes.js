/*
    patient_id
    diagnosis
    medications [{medicineName}]
    medicalNotes
*/

import mongoose, {Schema, model} from "mongoose"

const expedientesSchema = new Schema({
    patient_id: {type: mongoose.Schema.ObjectId, ref: "Paciente"},
    diagnosis: {type: String},
    medications: [{
        medicineName: {type: String},
        _id: false
    }],
    medicalNotes: {type: String}
}, {
    timestamps: true,
    strict: false
})

export default model("Expedientes", expedientesSchema)