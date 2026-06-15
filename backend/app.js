import express from "express"
import registerPacienteRoutes from "./src/routes/registerPaciente.js"
import pacienteRoutes from "./src/routes/paciente.js"
import especilidadRoutes from "./src/routes/especilidad.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use("/api/registerPaciente", registerPacienteRoutes)
app.use("/api/paciente", pacienteRoutes);
app.use("/api/especilidad", especilidadRoutes)

export default app;