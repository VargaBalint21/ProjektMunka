import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, setFirstName] = useState(localStorage.getItem('first_name'));
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return setCartCount(0);
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
    setFirstName(localStorage.getItem('first_name'));
    updateCartCount();
  }, [location]);

  useEffect(() => {
    window.addEventListener('item-added-to-cart', updateCartCount);
    return () => window.removeEventListener('item-added-to-cart', updateCartCount);
  }, []);

  const handleLogout = () => {
    const userId = localStorage.getItem('user_id');
    if (userId) localStorage.removeItem(`cart_${userId}`);
    localStorage.removeItem('token');
    localStorage.removeItem('first_name');
    localStorage.removeItem('user_id');
    setFirstName(null);
    setCartCount(0);
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">Webshop</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Kosár ({cartCount})</Link>
            </li>
            {firstName ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <Link className="nav-link" to="/profile">Szia, {firstName}!</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={handleLogout}>Kijelentkezés</button>
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