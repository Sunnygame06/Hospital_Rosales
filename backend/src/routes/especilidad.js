import express from "express"
import especialidadController from "../controller/especialidad.js"

const router = express.Router();

router.route("/")
    .get(especialidadController.getEspecialidades)
    .post(especialidadController.insertEspecilidad)

router.route("/:id")
    .put(especialidadController.updateEspecilidad)
    .delete(especialidadController.deleteEspecilidad)

export default router;
