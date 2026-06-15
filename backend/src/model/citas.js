/*
    patient_id
    specialty_id
    appointmentDate
    reason
    status
    observations
*/

import mongoose, {Schema, model} from "mongoose"

const citasSchema = new Schema({
    patient_id: {type: mongoose.Schema.ObjectId, ref: "Paciente"},
    specialty_id: {type: mongoose.Schema.ObjectId, ref: "Especilidad"},
    appointmentDate: {type: Date},
    reason: {type: String},
    status: {type: String},
    observations: {type: String}
}, {
    timestamps: true,
    strict: false
})

export default model("Citas", citasSchema)