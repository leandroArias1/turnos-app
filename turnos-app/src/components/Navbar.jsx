import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const linkClass = ({ isActive }) => (isActive ? "navLink active" : "navLink");

  return (
    <header className="navbarWrap">
      <nav className="navbar">
        <div className="brand">
          <span className="brandTitle">Turnos App</span>
          <span className="brandSub">Barbería</span>
        </div>

        <div className="navLinks">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink
            to="/reservar"
            className={({ isActive }) =>
              isActive ? "navLink primary active" : "navLink primary"
            }
          >
            Reservar
          </NavLink>

          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
