import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://localhost:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));

      axios.get("http://localhost:8000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setCartItems(res.data))
        .catch(() => setCartItems([]));
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:8000/api/logout", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Hiba a kijelentkezés során", error);
    }

    localStorage.removeItem("token");
    setUser(null);
    setCartItems([]);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <Link to="/" className="navbar-brand">Webshop</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {user && (
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  Kosár ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">{user.first_name}</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={handleLogout}>Kijelentkezés</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-outline-primary me-2">Bejelentkezés</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-primary">Regisztráció</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <main className="container py-4">
        <Outlet context={{ cartItems, setCartItems }} />
      </main>
    </>
  );
}

export default Layout;
