import express from "express";
import pacienteController from "../controller/paciente.js";
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router();

router.route("/").get(pacienteController.getPacientes);

router.route("/:id")
    .put(upload.single("profilePhoto"), pacienteController.updatePaciente)
    .delete(pacienteController.deletePaciente);

export default router;