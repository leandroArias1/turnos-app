import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Barbería X</h1>
      <p>Reservá tu turno en 30 segundos</p>

      <Link to="/reservar">
        <button type="button">Reservar Turno</button>
      </Link>
    </div>
  );
}
export default Home;