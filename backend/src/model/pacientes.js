/*
    name,
    lastName,
    password
    birthDate
    phone
    address
    phoneEmergencyContacts [{ phone, nameEmergencyContact }]
    profilePhoto
    isVerified
    loginAttempts
    timeOut
*/

import {Schema, model} from "mongoose"

const pacienteSchema = new Schema({
    name: {type: String},
    lastName: {type: String},
    password: {type: String},
    birthDate: {type: Date},
    phone: {type: String},
    address: {type:String},
    phoneEmergencyContacts: 
        [{ 
            phone: {type: String}, 
            nameEmergencyContact: {type: String}
        }],
    profilePhoto: {type: String},
    public_id: {type: String},
    isVerified: {type: Boolean},
    loginAttempts: {type: Number},
    timeOut: {type: Date}
}, {
    timestamps: true,
    strict: false
})

export default model("Paciente", pacienteSchema)