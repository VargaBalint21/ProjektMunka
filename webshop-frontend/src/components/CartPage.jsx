import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  // Kosár betöltése
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios.get("http://localhost:8000/api/cart", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setItems(res.data))
    .catch(err => console.error("Hiba a kosár lekérésekor", err));
  }, [navigate]);

  // Egy termék eltávolítása
  const handleRemove = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8000/api/cart/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setItems(items.filter(item => item.id !== id));
  };

  // Teljes kosár ürítése
  const handleClear = async () => {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:8000/api/cart/clear", {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setItems([]);
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