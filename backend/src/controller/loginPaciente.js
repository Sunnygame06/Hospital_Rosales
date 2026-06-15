import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import { config } from "../../config.js";

import pacienteModel from "../model/pacientes.js"

const loginPacienteController = {};

loginPacienteController.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const pacienteFound = await pacienteModel.findOne({email})

        if(!pacienteFound){
            return res.status(400).json({message: "No existe el paciente"})
        }

        if(pacienteFound.timeOut && pacienteFound.timeOut > Date.now()){
            return res.status(403).json({message: "Error"})
        }

        const isMatch = await bcrypt.compare(
            password, pacienteFound.password
        )

        if(!isMatch){
            pacienteFound.loginAttempts = (pacienteFound.loginAttempts || 0) +1
            
            if(pacienteFound.loginAttempts >= 5){
                pacienteFound.timeOut = Date.now() + 5 * 60 * 1000;
                pacienteFound.loginAttempts = 0

                await pacienteFound.save();

                return res.status(403).json({message: "Paciente bloqueado"})
            }
            await pacienteFound.save();

            return res.status(401).json({message: "Contraseña incorrecta"})
        }

        pacienteFound.loginAttempts = 0;
        pacienteFound.timeOut = null;

        const token = jsonwebtoken.sign(
            {id: pacienteFound._id, userType: "paciente"},
            config.JWT.secret,
            {expiresIn: "30d"}
        )

        res.cookie("authCookie", token)

        return res.status(200).json({message: "Login exitoso"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

export default loginPacienteController;