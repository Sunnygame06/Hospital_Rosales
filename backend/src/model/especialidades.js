/*
    specialtyName
    description
    isAvailable
*/

import {Schema, model} from "mongoose"

const especialidadesSchema = new Schema({
    specialtyName: {type: String},
    description: {type: String},
    isAvailable: {type: Boolean}
}, {
    timestamps: true,
    strict: false
})

export default model("Especilidad", especialidadesSchema)