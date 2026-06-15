import express from "express"
import registerPacienteController from "../controller/registerPaciente.js"
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router();

router.route("/").post(upload.single("profilePhoto"), registerPacienteController.register)
router.route("/codigo").post(registerPacienteController.verifyCode)

export default router;