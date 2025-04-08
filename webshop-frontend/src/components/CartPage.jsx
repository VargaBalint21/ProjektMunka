import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { setCartItems } = useOutletContext();

  const loadCart = () => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:8000/api/cart", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setItems(res.data);
        setCartItems(res.data);
      })
      .catch(() => {
        setItems([]);
        setCartItems([]);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    loadCart();
  }, [navigate]);

  const handleRemove = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8000/api/cart/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    loadCart();
  };

  const handleClear = async () => {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:8000/api/cart/clear", {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    loadCart();
  };

  return (
    <div className="container mt-5">
      <h2>Kosarad</h2>
      {items.length === 0 ? (
        <p>A kosarad üres.</p>
      ) : (
        <>
          <ul className="list-group">
            {items.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between">
                <div>
                  {item.product?.name} – {item.quantity} db
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => handleRemove(item.id)}>Törlés</button>
              </li>
            ))}
          </ul>
          <button className="btn btn-warning mt-3" onClick={handleClear}>Kosár ürítése</button>
        </>
      )}
    </div>
  );
}

export default CartPage;
