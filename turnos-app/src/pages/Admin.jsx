import "../styles/admin.css";

function Admin({ turnos, cancelTurno }) {
  const active = turnos.filter((t) => t.status === "active");
  const cancelled = turnos.filter((t) => t.status === "cancelled");

  return (
    <div className="page">
      <h2>Admin</h2>

      <h3>Activos ({active.length})</h3>
      {active.length === 0 ? (
        <p>No hay turnos activos.</p>
      ) : (
        <ul className="turnosList">
          {active.map((t) => (
            <li key={t.id} className="turnoItem">
              <div>
                <strong>{t.hour}</strong> — {t.name} ({t.phone}) — {t.service}
              </div>
              <button type="button" onClick={() => cancelTurno(t.id)}>
                Cancelar
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Cancelados ({cancelled.length})</h3>
      {cancelled.length === 0 ? (
        <p>No hay turnos cancelados.</p>
      ) : (
        <ul className="turnosList">
          {cancelled.map((t) => (
            <li key={t.id} className="turnoItem cancelled">
              <div>
                <strong>{t.hour}</strong> — {t.name} ({t.phone}) — {t.service}
              </div>
              <span>Cancelado</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Admin;
