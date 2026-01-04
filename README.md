# Turnos App (Barbería)

App web para gestionar turnos de barbería con intervalos de 30 minutos.
Incluye vista de cliente para reservar y panel admin para cancelar turnos.

## Demo
- Producción: (pegá acá tu link de Vercel)

## Funcionalidades
- Generación automática de horarios (09:00 a 18:00, cada 30 min)
- Reserva de turno con nombre, teléfono y servicio
- Prevención de doble reserva (slots ocupados)
- Panel Admin:
  - lista de turnos activos
  - cancelar turno (pasa a cancelado y libera el horario)
- Persistencia en `localStorage` (sobrevive a refresh)

## Tecnologías
- React + Vite
- React Router
- CSS puro

## Cómo correr el proyecto
```bash
npm install
npm run dev
