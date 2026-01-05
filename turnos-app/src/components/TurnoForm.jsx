function TurnoForm({
  selectedHour,
  form,
  setForm,
  onConfirm,
  onCancel,
  submitting = false,
}) {
  return (
    <form className="form" onSubmit={onConfirm}>
      <h3>Confirmar turno: {selectedHour}</h3>

      <label>
        Nombre
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Ej: Leandro"
          disabled={submitting}
        />
      </label>

      <label>
        Teléfono
        <input
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          placeholder="Ej: 261..."
          disabled={submitting}
        />
      </label>

      <label>
        Servicio
        <select
          value={form.service}
          onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
          disabled={submitting}
        >
          <option value="Corte">Corte</option>
          <option value="Barba">Barba</option>
          <option value="Corte + Barba">Corte + Barba</option>
        </select>
      </label>

      <div className="formActions">
        <button type="submit" disabled={submitting}>
          {submitting ? "Confirmando..." : "Confirmar"}
        </button>

        <button type="button" onClick={onCancel} disabled={submitting}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default TurnoForm;
