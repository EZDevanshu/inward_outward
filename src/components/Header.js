import { Link, NavLink } from "react-router-dom";
import "../style/header.css";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container-fluid">

        <NavLink className="navbar-brand app-brand" to="/">
          Inward-Outward
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#appNavbar"
          aria-controls="appNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="appNavbar">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/add">
                Add Entry
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/list">
                Records
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/edit/1">
                Edit
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/change-password">
                Change Password
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
