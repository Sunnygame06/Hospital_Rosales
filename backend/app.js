import express from "express"
import registerPacienteRoutes from "./src/routes/registerPaciente.js"
import pacienteRoutes from "./src/routes/paciente.js"
import especilidadRoutes from "./src/routes/especilidad.js"
import citaRoutes from "./src/routes/cita.js"
import expedienteRoutes from "./src/routes/expediente.js"
import equipoRoutes from "./src/routes/equipo.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use("/api/registerPaciente", registerPacienteRoutes);
app.use("/api/paciente", pacienteRoutes);
app.use("/api/especilidad", especilidadRoutes);
app.use("/api/cita", citaRoutes);
app.use("/api/expediente", expedienteRoutes);
app.use("/api/equipo", equipoRoutes);

export default app;