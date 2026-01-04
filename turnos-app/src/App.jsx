import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import Reservar from "./pages/Reservar.jsx";
import Admin from "./pages/Admin.jsx";

function App() {
  const [turnos, setTurnos] = useState(() => {
  const saved = localStorage.getItem("turnos");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("turnos", JSON.stringify(turnos));
}, [turnos]);

  const occupiedSet = useMemo(() => {
    const active = turnos.filter((t) => t.status === "active");
    return new Set(active.map((t) => t.hour));
  }, [turnos]);

  function addTurno(newTurno) {
    setTurnos((prev) => [...prev, newTurno]);
  }

  function cancelTurno(id) {
    setTurnos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "cancelled" } : t))
    );
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/reservar"
          element={
            <Reservar
              turnos={turnos}
              occupiedSet={occupiedSet}
              addTurno={addTurno}
            />
          }
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
