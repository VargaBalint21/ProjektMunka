import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">Webshop</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/register">Regisztráció</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Belépés</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
