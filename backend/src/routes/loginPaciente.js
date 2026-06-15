import express from "express"
import loginPacienteController from "../controller/loginPaciente.js"

const router = express.Router();

router.route("/").post(loginPacienteController.login)

export default router;