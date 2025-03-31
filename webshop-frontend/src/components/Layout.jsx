import { Outlet, Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const Layout = () => {
  const navigate = useNavigate();
  const firstName = localStorage.getItem('first_name');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('first_name');
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">Webshop</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {firstName ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <span className="nav-link">Szia, {firstName}!</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-ligh" onClick={handleLogout}>
                    Kijelentkezés
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Regisztráció</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Belépés</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
