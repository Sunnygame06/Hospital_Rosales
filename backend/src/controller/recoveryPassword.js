import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import nodemailer from "nodemailer"

import {config} from "../../config.js"

import pacienteModel from "../model/pacientes.js"

const recoveryPasswordController = {}

recoveryPasswordController.requestCode = async (req, res) => {
    try{
        const {email} = req.body;

        const pacienteFound = await pacienteModel.findOne({email});

        if(!pacienteFound){
            return res.status(404).json({message: "No existe ese paciente"})
        }

        const randomCode = crypto.randomBytes(3).toString("hex")

        const token = jsonwebtoken.sign(
            {email, randomCode, userType: "paciente", verified: false},
            config.JWT.secret,
            {expiresIn: "15m"}
        )

        res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_pass
            }
        })

        const mailOptions = {
            from: config.user_email,
            to: email,
            subject: "Recuperacion de contraseña",
            text: "Este es tu codigo: " + randomCode
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("error" + error)
                return res.status(500).json({message: "Internal Server Error"})
            }
            return res.status(200).json({message: "email sent"})
        })
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

recoveryPasswordController.verifyCode = async (req, res) => {
    try {
        const {code} = req.body;

        const token = req.cookies.recoveryCookie
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if(code !== decoded.randomCode){
            return res.status(400).json({message: "El codigo no coincide"})
        }

        const newToken = jsonwebtoken.sign(
            {email: decoded.email, userType: "paciente", verified: true},
            config.JWT.secret,
            {expiresIn: "15m"}
        );

        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000});

        return res.status(200).json({message: "Codigo verificado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

recoveryPasswordController.newPassword = async (req, res) => {
    try {
        const {newPassword, confirmNewPassword} = req.body;

        if(newPassword !== confirmNewPassword){
            return res.status(400).json({message: "Las contraseñas no coinciden"})
        }

        const token = req.cookies.recoveryCookie
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if(!decoded.verified){
            return res.status(400).json({message: "error"})
        }

        const passwordHashed = await bcrypt.hash(newPassword, 10)

        await pacienteModel.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHashed},
            {new: true}
        )

        res.clearCookie("recoveryCookie")

        return res.status(200).json({message: "Contraseña actualizada"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

export default recoveryPasswordController;