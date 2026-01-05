import { useEffect, useMemo, useState } from "react";
import { generateTimeSlots } from "../utils/time";
import Slot from "../components/Slot";
import TurnoForm from "../components/TurnoForm";
import { getTurnos, createTurno } from "../api/turnosApi";

function Reservar() {
  const slots = useMemo(() => generateTimeSlots("09:00", "18:00", 30), []);

  const [turnos, setTurnos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", service: "Corte" });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [notice, setNotice] = useState(null); // { type: "success" | "error", text: string }

  // cargar turnos desde backend
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getTurnos();
        setTurnos(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setNotice({ type: "error", text: e?.message || "No se pudieron cargar los turnos" });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // horarios ocupados (solo activos)
  const occupiedSet = useMemo(() => {
    const active = turnos.filter((t) => t.status === "active");
    return new Set(active.map((t) => t.hour));
  }, [turnos]);

  function handleSelect(hour) {
    if (occupiedSet.has(hour)) return; // no permitir seleccionar ocupados
    setNotice(null);
    setSelected((prev) => (prev === hour ? null : hour));
  }

  async function handleConfirm(e) {
    e.preventDefault();
    if (!selected) return;

    const name = form.name.trim();
    const phone = form.phone.trim();
    const service = form.service;

    if (!name) return setNotice({ type: "error", text: "Falta nombre" });
    if (!phone) return setNotice({ type: "error", text: "Falta teléfono" });

    // chequeo local (igual backend valida)
    if (occupiedSet.has(selected)) {
      return setNotice({ type: "error", text: "Ese horario ya está ocupado" });
    }

    try {
      setSubmitting(true);
      setNotice(null);

      const nuevo = await createTurno({ hour: selected, name, phone, service });

      // actualizar lista local con el nuevo turno
      setTurnos((prev) => [nuevo, ...prev]);
      setSelected(null);
      setForm({ name: "", phone: "", service: "Corte" });

      setNotice({ type: "success", text: "Turno reservado ✅" });
    } catch (e) {
      console.error(e);
      setNotice({ type: "error", text: e?.message || "Error al reservar" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <div className="reservarHeader">
        <h2>Reservar turno</h2>
        <span className="badge">Turnos de 30 min</span>
      </div>

      <div className="containerCard reservarCard">
        {loading ? (
          <p>Cargando horarios...</p>
        ) : (
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
        )}

        {notice && (
          <div className={`notice ${notice.type}`}>
            {notice.text}
          </div>
        )}

        {selected && (
          <TurnoForm
            selectedHour={selected}
            form={form}
            setForm={setForm}
            onConfirm={handleConfirm}
            onCancel={() => setSelected(null)}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
}

export default Reservar;
