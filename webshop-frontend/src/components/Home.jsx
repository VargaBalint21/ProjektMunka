import { useState, useEffect } from 'react';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('A termékek betöltése nem sikerült.');
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return alert('Bejelentkezés szükséges.');
    const key = `cart_${userId}`;
    const cart = JSON.parse(localStorage.getItem(key)) || [];
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem(key, JSON.stringify(cart));
    window.dispatchEvent(new Event('item-added-to-cart'));
  };

  if (loading) return <div className="text-center mt-5">Betöltés...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Termékeink</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(product => (
          <div className="col" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={`http://localhost:8000/images/${product.image}`}
                className="card-img-top"
                alt={product.name}
                onError={e => e.target.src = 'https://placehold.co/300x200?text=No+Image'}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text fw-bold text-primary">${(product.price / 100).toFixed(2)}</p>
                <p className="card-text text-muted">Készleten: {product.stock}</p>
                <button className="btn btn-success mt-auto" onClick={() => addToCart(product)}>Kosárba</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;