import pacienteModel from "../model/pacientes.js"
import {v2 as cloudinary} from "cloudinary"

const pacienteController = {};

//SELECT
pacienteController.getPacientes = async (req, res) => {
    try {
        const pacientes = await pacienteModel.find();
        return res.status(200).json(pacientes)
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//UPDATE
pacienteController.updatePaciente = async (req, res) => {
    try {
        const {
            name,
            lastName,
            email,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            isVerified
        } = req.body;

        const pacienteFound = await pacienteModel.findById(req.params.id)

        const updatedData = {
            name,
            lastName,
            email,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            isVerified
        }

        if(req.file){
            await cloudinary.uploader.destroy(pacienteFound.public_id)

            updatedData.profilePhoto = req.file.path
            updatedData.public_id = req.file.filename
        }

        await pacienteModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new: true}
        )

        return res.status(200).json({message: "Paciente actualizado"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

pacienteController.deletePaciente = async (req, res) => {
    try {
        const pacienteFound = await pacienteModel.findById(req.params.id)

        await cloudinary.uploader.destroy(pacienteFound.public_id)

        await pacienteModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Paciente eliminado"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

export default pacienteController;