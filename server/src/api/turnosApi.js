const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function getTurnos() {
  const res = await fetch(`${API_URL}/api/turnos`);
  if (!res.ok) throw new Error("Error al cargar turnos");
  return res.json();
}

export async function createTurno(payload) {
  const res = await fetch(`${API_URL}/api/turnos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.status === 409) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Horario ocupado");
  }

  if (!res.ok) throw new Error("Error al crear turno");
  return res.json();
}

export async function cancelTurno(id) {
  const res = await fetch(`${API_URL}/api/turnos/${id}/cancel`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Error al cancelar turno");
  return res.json();
}
