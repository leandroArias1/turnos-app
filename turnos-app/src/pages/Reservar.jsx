import { useMemo, useState } from "react";
import { generateTimeSlots } from "../utils/time";
import Slot from "../components/Slot";
import TurnoForm from "../components/TurnoForm";

function Reservar({ occupiedSet, addTurno }) {
  const slots = useMemo(() => generateTimeSlots("09:00", "18:00", 30), []);

  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", service: "Corte" });

  function handleConfirm(e) {
    e.preventDefault();

    if (!selected) return;

    const name = form.name.trim();
    const phone = form.phone.trim();

    if (!name) return alert("Falta nombre");
    if (!phone) return alert("Falta teléfono");
    if (occupiedSet.has(selected)) return alert("Ese horario ya está ocupado");

    addTurno({
      id: crypto.randomUUID(),
      hour: selected,
      name,
      phone,
      service: form.service,
      status: "active",
      createdAt: new Date().toISOString(),
    });

    setSelected(null);
    setForm({ name: "", phone: "", service: "Corte" });
  }

  function handleSelect(hour) {
    setSelected((prev) => (prev === hour ? null : hour));
  }

  return (
    <div className="page">
      <h2>Reservar turno</h2>

      <div className="slotsGrid">
        {slots.map((hour) => (
          <Slot
            key={hour}
            hour={hour}
            isSelected={selected === hour}
            isOccupied={occupiedSet.has(hour)}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {selected && (
        <TurnoForm
          selectedHour={selected}
          form={form}
          setForm={setForm}
          onConfirm={handleConfirm}
          onCancel={() => setSelected(null)}
        />
      )}
    </div>
  );
}

export default Reservar;
