import especialidadModel from "../model/especialidades.js"

const especialidadController = {};

//SELECT
especialidadController.getEspecialidades = async (req, res) => {
    try {
        const especialidades = await especialidadModel.find();
        return res.status(200).json(especialidades)
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//INSERT
especialidadController.insertEspecilidad = async (req, res) => {
    try{
        const {specialtyName, description, isAvailable} = req.body;

        const newEspecilidad = new especialidadModel({
            specialtyName, description, isAvailable
        });

        await newEspecilidad.save();

        return res.status(200).json({message: "Especilidad agregada"})
    }catch (error){
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//UPDATE
especialidadController.updateEspecilidad = async (req, res) => {
    try {
        let {
            specialtyName, description, isAvailable
        } = req.body;

        if(!specialtyName || !description || !isAvailable){
            return res.status(400).json({message: "Completar los campos"})
        }

        const especilidadUpdated = await especialidadModel.findByIdAndUpdate(req.params.id, {
            specialtyName, description, isAvailable
        }, {new: true},)

        if(!especilidadUpdated){
            return res.status(404).json({message: "No se encontro la especilidad"})
        }

        return res.status(200).json({message: "Especilidad Actulizada"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//DELETE
especialidadController.deleteEspecilidad = async (req, res) => {
    try {
        const deletedEspecilidad = await especialidadModel.findByIdAndDelete(req.params.id);

        if(!deletedEspecilidad){
            return res.status(404).json({message: "No se encontro la especilidad"})
        }

        return res.status(200).json({message: "Especilidad Eliminada"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

export default especialidadController;