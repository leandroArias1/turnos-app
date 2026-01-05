import express from "express";
import cors from "cors";
import turnosRoutes from "./routes/turnos.routes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());

app.use("/api/turnos", turnosRoutes);

export default app;
