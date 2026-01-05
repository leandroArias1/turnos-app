const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";


export async function getTurnos() {
  const res = await fetch(`${API_URL}/api/turnos`);
  const data = await res.json().catch(() => null);

  if (!res.ok) throw new Error("Error al cargar turnos");

  // si el backend devuelve algo que no es array, devolvemos []
  return Array.isArray(data) ? data : [];
}

export async function createTurno(payload) {
  const res = await fetch(`${API_URL}/api/turnos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 409) throw new Error(data.message || "Horario ocupado");
  if (!res.ok) throw new Error(data.message || "Error al crear turno");

  return data;
}

export async function cancelTurno(id) {
  const res = await fetch(`${API_URL}/api/turnos/${id}/cancel`, {
    method: "PATCH",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.message || "Error al cancelar turno");
  return data;
}
