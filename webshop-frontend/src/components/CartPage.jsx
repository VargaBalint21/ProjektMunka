import { useEffect, useState } from 'react';

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      setCart([]);
      return;
    }
    const savedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    setCart(savedCart);
  }, []);

  const removeItem = (id) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;
    const key = `cart_${userId}`;
    const updatedCart = cart.filter(item => item.id !== id);
    localStorage.setItem(key, JSON.stringify(updatedCart));
    setCart(updatedCart);
    window.dispatchEvent(new Event('item-added-to-cart'));
  };

  const clearCart = () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;
    localStorage.removeItem(`cart_${userId}`);
    setCart([]);
    window.dispatchEvent(new Event('item-added-to-cart'));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Kosár</h2>
      {cart.length === 0 ? (
        <p>A kosarad üres.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.name}</strong> – {item.quantity} db
                </div>
                <div>
                  {(item.price * item.quantity / 100).toFixed(2)} $
                  <button className="btn btn-sm btn-danger ms-3" onClick={() => removeItem(item.id)}>Törlés</button>
                </div>
              </li>
            ))}
          </ul>
          <h5>Végösszeg: {(total / 100).toFixed(2)} $</h5>
          <button className="btn btn-warning mt-3" onClick={clearCart}>Kosár ürítése</button>
        </>
      )}
    </div>
  );
}

export default CartPage;
