import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/reservar">Reservar</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}

export default Navbar;