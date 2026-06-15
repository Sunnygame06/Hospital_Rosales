import expedientesModel from "../model/expedientes.js"

const expedientesController = {};

//SELECT
expedientesController.getExpedientess = async (req, res) => {
    try {
        const expedientes = await expedientesModel.find();
        return res.status(200).json(expedientes)
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//INSERT
expedientesController.insertExpedientes = async (req, res) => {
    try{
        const { patient_id,
                diagnosis,
                medications,
                medicalNotes} = req.body;

        const newExpediente = new expedientesModel({
            patient_id,
            diagnosis,
            medications,
            medicalNotes
        });

        await newExpediente.save();

        return res.status(200).json({message: "Expediente agregado"})
    }catch (error){
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//UPDATE
expedientesController.updateExpediente = async (req, res) => {
    try {
        let {
            patient_id,
            diagnosis,
            medications,
            medicalNotes
        } = req.body;

        if(!diagnosis || !patient_id || !medications){
            return res.status(400).json({message: "Completar los campos"})
        }

        const ExpedientesUpdated = await expedientesModel.findByIdAndUpdate(req.params.id, {
            patient_id,
            diagnosis,
            medications,
            medicalNotes
        }, {new: true},)

        if(!ExpedientesUpdated){
            return res.status(404).json({message: "No se encontro el expediente"})
        }

        return res.status(200).json({message: "Expediente Actulizado"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//DELETE
expedientesController.deleteExpediente = async (req, res) => {
    try {
        const deletedExpediente = await expedientesModel.findByIdAndDelete(req.params.id);

        if(!deletedExpediente){
            return res.status(404).json({message: "No se encontro el expediente"})
        }

        return res.status(200).json({message: "Expediente Eliminada"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

export default expedientesController;