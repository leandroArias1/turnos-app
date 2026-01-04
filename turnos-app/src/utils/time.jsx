// src/utils/time.js

function pad2(n) {
  return String(n).padStart(2, "0");
}

function minutesToHHmm(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${pad2(h)}:${pad2(m)}`;
}

/**
 * Genera horarios en formato "HH:mm"
 * @param {string} start "HH:mm" (incluido)
 * @param {string} end "HH:mm" (excluido)
 * @param {number} stepMinutes ej 30
 * @returns {string[]} ej ["09:00","09:30",...]
 */
export function generateTimeSlots(start = "09:00", end = "18:00", stepMinutes = 30) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;

  const slots = [];
  for (let t = startMin; t < endMin; t += stepMinutes) {
    slots.push(minutesToHHmm(t));
  }
  return slots;
}
