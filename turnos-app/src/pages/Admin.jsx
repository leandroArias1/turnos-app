import { useEffect, useState } from "react";
import { getTurnos, cancelTurno as apiCancelTurno } from "../api/turnosApi";

function Admin() {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null); // {type,text}

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

  const active = turnos.filter((t) => t.status === "active");
  const cancelled = turnos.filter((t) => t.status === "cancelled");

  async function handleCancel(id) {
    try {
      setNotice(null);
      const updated = await apiCancelTurno(id);
      setTurnos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setNotice({ type: "success", text: "Turno cancelado ✅" });
    } catch (e) {
      console.error(e);
      setNotice({ type: "error", text: e?.message || "Error al cancelar" });
    }
  }

  return (
    <div className="page">
      <h2>Admin</h2>

      <div className="containerCard adminWrap">
        {loading ? <p>Cargando turnos...</p> : null}

        {notice && <div className={`notice ${notice.type}`}>{notice.text}</div>}

        <div className="sectionTitleRow">
          <h3>Activos ({active.length})</h3>
        </div>

        {active.length === 0 && !loading ? (
          <p>No hay turnos activos.</p>
        ) : (
          <ul className="turnosList">
            {active.map((t) => (
              <li key={t._id} className="turnoItem">
                <div className="turnoInfo">
                  <div className="turnoMain">
                    <span className="turnoHour">{t.hour}</span>
                    <strong>{t.name}</strong>
                    <span className="turnoMeta">({t.phone})</span>
                  </div>
                  <div className="turnoMeta">{t.service}</div>
                </div>

                <button className="btnDanger" onClick={() => handleCancel(t._id)}>
                  Cancelar
                </button>
              </li>
            ))}
          </ul>
        )}

        <hr />

        <div className="sectionTitleRow">
          <h3>Cancelados ({cancelled.length})</h3>
        </div>

        {cancelled.length === 0 && !loading ? (
          <p>No hay turnos cancelados.</p>
        ) : (
          <ul className="turnosList">
            {cancelled.map((t) => (
              <li key={t._id} className="turnoItem cancelled">
                <div className="turnoInfo">
                  <div className="turnoMain">
                    <span className="turnoHour">{t.hour}</span>
                    <strong>{t.name}</strong>
                    <span className="turnoMeta">({t.phone})</span>
                  </div>
                  <div className="turnoMeta">{t.service}</div>
                </div>

                <span className="cancelTag">Cancelado</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Admin;
