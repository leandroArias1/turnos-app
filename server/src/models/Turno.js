import mongoose from "mongoose";

const TurnoSchema = new mongoose.Schema(
  {
    hour: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    service: {
      type: String,
      required: true,
      enum: ["Corte", "Barba", "Corte + Barba"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "cancelled"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Turno", TurnoSchema);
