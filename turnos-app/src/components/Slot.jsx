function Slot({ hour, isSelected, isOccupied, onSelect }) {
  const className = `slot ${isSelected ? "selected" : ""} ${isOccupied ? "occupied" : ""}`;

  return (
    <button
      className={className}
      onClick={() => onSelect(hour)}
      type="button"
      disabled={isOccupied}
      title={isOccupied ? "Ocupado" : "Disponible"}
    >
      {hour}
    </button>
  );
}

export default Slot;
