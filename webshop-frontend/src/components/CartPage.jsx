import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const token = localStorage.getItem("token");

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);
    setTotal(total);
  };

  const loadCart = () => {
    axios.get("http://localhost:8000/api/cart", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setItems(res.data);
        calculateTotal(res.data);
      })
      .catch(err => console.error("Hiba a kosár lekérésekor", err));
  };

  useEffect(() => {
    if (!token) return navigate("/login");
    loadCart();
  }, [navigate]);

  const handleRemove = async (id) => {
    await axios.delete(`http://localhost:8000/api/cart/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    loadCart();
  };

  const handleClear = async () => {
    await axios.post("http://localhost:8000/api/cart/clear", {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    loadCart();
  };

  const increaseQuantity = async (item) => {
    if (item.quantity >= item.product.stock) {
      return alert("Nincs több raktáron!");
    }

    await axios.put(`http://localhost:8000/api/cart/${item.id}`, {
      quantity: item.quantity + 1
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    loadCart();
  };

  const decreaseQuantity = async (item) => {
    if (item.quantity === 1) {
      return handleRemove(item.id);
    }

    await axios.put(`http://localhost:8000/api/cart/${item.id}`, {
      quantity: item.quantity - 1
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    loadCart();
  };

  const handleOrderRedirect = () => {
    navigate("/order");
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
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.product?.name}</strong> — {item.quantity} db
                  <br />
                  <small className="text-muted">Max: {item.product?.stock} db</small>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-secondary" onClick={() => decreaseQuantity(item)}>-</button>
                  <button className="btn btn-sm btn-primary" onClick={() => increaseQuantity(item)}>+</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleRemove(item.id)}>Törlés</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-3 text-end">
            <h5>Végösszeg: <strong>{(total / 100).toFixed(2)} Ft</strong></h5>
            <button
              className="btn btn-success mt-2"
              onClick={handleOrderRedirect}
              disabled={items.length === 0}
            >
              Megrendelés leadása
            </button>
          </div>

          <button className="btn btn-warning mt-3" onClick={handleClear}>Kosár ürítése</button>
        </>
      )}
    </div>
  );
}

export default CartPage;
