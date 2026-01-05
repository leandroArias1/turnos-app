import { Router } from "express";
import Turno from "../models/Turno.js";

const router = Router();

// GET /api/turnos -> devuelve ARRAY
router.get("/", async (req, res) => {
  const turnos = await Turno.find().sort({ createdAt: -1 });
  res.json(turnos);
});

// POST /api/turnos -> crear
router.post("/", async (req, res) => {
  const { hour, name, phone, service } = req.body;

  if (!hour || !name || !phone || !service) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  const exists = await Turno.findOne({ hour, status: "active" });
  if (exists) return res.status(409).json({ message: "Horario ocupado" });

  const turno = await Turno.create({ hour, name, phone, service, status: "active" });
  res.status(201).json(turno);
});

// PATCH /api/turnos/:id/cancel -> cancelar
router.patch("/:id/cancel", async (req, res) => {
  const { id } = req.params;

  const turno = await Turno.findByIdAndUpdate(
    id,
    { status: "cancelled" },
    { new: true }
  );

  if (!turno) return res.status(404).json({ message: "Turno no encontrado" });
  res.json(turno);
});

export default router;
