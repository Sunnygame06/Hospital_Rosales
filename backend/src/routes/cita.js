import express from "express"
import citaController from "../controller/cita.js"

const router = express.Router();

router.route("/")
    .get(citaController.getCitas)
    .post(citaController.insertCitas)

router.route("/:id")
    .put(citaController.updateCita)
    .delete(citaController.deleteCita)

export default router;