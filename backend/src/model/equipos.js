/*
    equipmentName
    description
    brand
    model
    purchaseDate
    maintenanceDate
    condition
    image
    status
    isAvailable
*/

import {Schema, model} from "mongoose"

const equiposSchema = new Schema({
    equipmentName: {type: String},
    description: {type: String},
    brand: {type: String},
    model: {type: String},
    purchaseDate: {type: Date},
    maintenanceDate: {type: Date},
    condition: {type: String},
    image: {type: String},
    public_id: {type: String},
    status: {type: String},
    isAvailable: {type: Boolean}
}, {
    timestamps: true,
    strict: false
})

export default model("Equipo", equiposSchema)

