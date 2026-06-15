import express from "express"
import expedienteController from "../controller/expediente.js"

const router = express.Router();

router.route("/")
    .get(expedienteController.getExpedientess)
    .post(expedienteController.insertExpedientes)

router.route("/:id")
    .put(expedienteController.updateExpediente)
    .delete(expedienteController.deleteExpediente)

export default router;