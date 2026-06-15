import express from "express"
import registerPacienteRoutes from "./src/routes/paciente.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use("/api/registerPaciente", registerPacienteRoutes)

export default app;