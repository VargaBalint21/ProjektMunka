import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, setFirstName] = useState(localStorage.getItem('first_name'));
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    setFirstName(localStorage.getItem('first_name'));
  }, [location]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('first_name');
    localStorage.removeItem('cart');
    setFirstName(null);
    setCartItems([]);
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
                  <Link className="nav-link" to="/profile">Szia, {firstName}!</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Kosár ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={handleLogout}>
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
      <Outlet context={{ cartItems, setCartItems }} />
    </>
  );
};

export default Layout;
