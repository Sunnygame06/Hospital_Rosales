import citasModel from "../model/citas.js"

const citasController = {};

//SELECT
citasController.getCitas = async (req, res) => {
    try {
        const citas = await citasModel.find();
        return res.status(200).json(citas)
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//INSERT
citasController.insertCitas = async (req, res) => {
    try{
        const { patient_id,
                specialty_id,
                appointmentDate,
                reason,
                status,
                observations} = req.body;

        const newCita = new citasModel({
            patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations
        });

        await newCita.save();

        return res.status(200).json({message: "Cita agregada"})
    }catch (error){
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//UPDATE
citasController.updateCita = async (req, res) => {
    try {
        let {
            patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations
        } = req.body;

        if(!appointmentDate || !patient_id || !reason){
            return res.status(400).json({message: "Completar los campos"})
        }

        const citaUpdated = await citasModel.findByIdAndUpdate(req.params.id, {
            patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations
        }, {new: true},)

        if(!citaUpdated){
            return res.status(404).json({message: "No se encontro la cita"})
        }

        return res.status(200).json({message: "Cita Actulizada"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//DELETE
citasController.deleteCita = async (req, res) => {
    try {
        const deletedCita = await citasModel.findByIdAndDelete(req.params.id);

        if(!deletedCita){
            return res.status(404).json({message: "No se encontro la cita"})
        }

        return res.status(200).json({message: "Cita Eliminada"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal Server Error"})
    }
};

export default citasController;