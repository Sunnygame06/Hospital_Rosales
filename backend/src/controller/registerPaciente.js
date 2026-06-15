import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import {config} from "../../config.js"

import pacienteModel from "../model/pacientes.js"

const registerPacienteController = {};

registerPacienteController.register = async(req, res)=> {
    try {
        const {
            name,
            lastName,
            password,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            profilePhoto,
            isVerified,
        } = req.body;

        const exitsPaciente = await pacienteModel.findOne({email});

        if(exitsPaciente){
            return res.status(400).json({message: "El paciente ya existe"})
        }

        const passwordHashed = await bcryptjs.hash(password, 10)

        const randomCode = crypto.randomBytes(3).toString("hex")

        const token = jsonwebtoken.sign({
            randomCode,
            name,
            lastName,
            password: passwordHashed,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            profilePhoto: req.file.path,
            public_id: req.file.filename,
            isVerified,
            loginAttempts,
        },
        config.JWT.secret,
        {expiresIn: "15m"});

        res.cookie("registrationCookie", token,
            {maxAge: 15*60*1000})

        const Transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_pass
            }
        });

        const mailOptions = {
            from: config.email.user_email,
            to:email,
            subject: "Registrar Paciente",
            text: "Este es tu codigo: "+ randomCode
        }
        
        Transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log("error"+error)
                return res.status(500).json({message: "Internal Server Error"})
            }

            return res.status(200).json({message: "email sent"})
        })
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

registerPacienteController.verifyCode = async (req, res) => {
    try {
        const {code} = req.body;

        const token = req.cookies.registrationCookie

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        const {
            randomCode: storedCode,
            name,
            lastName,
            password,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            profilePhoto,
            isVerified,
            public_id
        } = decoded

        if(code !== storedCode){
            return res.status(400).json({message: "Codigo incorrecto"})
        }

        const newPaciente = pacienteModel({
            name,
            lastName,
            password,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            profilePhoto,
            isVerified: true,
        })

        await newPaciente.save();

        res.clearCookie("registrationCookie")

        return res.status(200).json({message: "Paciente registrado"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default registerPacienteController;