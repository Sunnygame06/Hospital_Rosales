import equipoModel from "../model/equipos.js"
import {v2 as cloudinary} from "cloudinary"

const equipoController = {};

//SELECT
equipoController.getEquipos = async (req, res) => {
    try {
        const equipos = await equipoModel.find();
        return res.status(200).json(equipos)
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//INSERT
equipoController.insertEquipos = async (req, res) => {
    try{
        const { equipmentName,
                description,
                brand,
                model,
                purchaseDate,
                maintenanceDate,
                condition,
                image,
                status,
                isAvailable} = req.body;

        const newEquipo = new equipoModel({
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            image: req.file.path,
            public_id: req.file.filename,
            status,
            isAvailable
        });

        await newEquipo.save();

        return res.status(200).json({message: "Equipo agregado"})
    }catch (error){
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//UPDATE
equipoController.updateEquipo = async (req, res) => {
    try {
        const {
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            status,
            isAvailable
        } = req.body;

        const equipoFound = await equipoModel.findById(req.params.id)

        const updatedData = {
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            status,
            isAvailable
        }

        if(req.file){
            await cloudinary.uploader.destroy(equipoFound.public_id)

            updatedData.profilePhoto = req.file.path
            updatedData.public_id = req.file.filename
        }

        await equipoModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new: true}
        )

        return res.status(200).json({message: "Equipo actualizado"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//DELETE
equipoController.deleteEquipo = async (req, res) => {
    try {
        const equipoFound = await equipoModel.findById(req.params.id)

        await cloudinary.uploader.destroy(equipoFound.public_id)

        await equipoModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Equipo eliminado"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

export default equipoController;