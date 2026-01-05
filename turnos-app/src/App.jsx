import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/reservar.css";
import "./styles/admin.css";
import "./styles/home.css"; // opcional



import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Reservar from "./pages/Reservar.jsx";
import Admin from "./pages/Admin.jsx";

import {
  getTurnos,
  createTurno,
  cancelTurno as apiCancelTurno,
} from "./api/turnosApi.js";

function App() {
  const [turnos, setTurnos] = useState([]); // SIEMPRE array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar turnos al iniciar
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getTurnos();
        setTurnos(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError(e?.message || "No se pudieron cargar los turnos");
        setTurnos([]); // seguridad
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // Slots ocupados = turnos activos
  const occupiedSet = useMemo(() => {
    const active = turnos.filter((t) => t.status === "active");
    return new Set(active.map((t) => t.hour));
  }, [turnos]);

  // Crear turno (POST)
  async function addTurno(payload) {
    // payload: { hour, name, phone, service }
    const nuevo = await createTurno(payload);
    // lo agrego arriba para que se vea primero
    setTurnos((prev) => [nuevo, ...prev]);
  }

  // Cancelar turno (PATCH)
  async function cancelTurno(id) {
    const updated = await apiCancelTurno(id);
    setTurnos((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );
  }

  // UI mínima para evitar pantalla blanca
  if (loading) {
    return (
      <div className="page">
        <Navbar />
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <Navbar />
        <p style={{ color: "tomato" }}>Error: {error}</p>
        <p>¿Está el backend prendido en http://localhost:4000 ?</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/reservar"
          element={<Reservar occupiedSet={occupiedSet} addTurno={addTurno} />}
        />

        <Route
          path="/admin"
          element={<Admin turnos={turnos} cancelTurno={cancelTurno} />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
