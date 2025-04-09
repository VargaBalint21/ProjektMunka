import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setCartItems } = useOutletContext(); // 🔁 csak ez lett hozzáadva

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(response => {
        setProducts(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(error => {
        setError('A termékek betöltése nem sikerült.');
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      await axios.post("http://localhost:8000/api/cart", {
        product_id: productId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 🔁 Kosár frissítése a Layout számára
      const res = await axios.get("http://localhost:8000/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data);

      
    } catch (err) {
      console.error("Nem sikerült a kosárba rakás", err);
    }
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
                src={product.image || 'https://placehold.co/300x200?text=Nincs+kép'}
                className="card-img-top"
                alt={product.name}
                onError={(e) => { e.target.src = 'https://placehold.co/300x200?text=Nincs+kép'; }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text fw-bold text-primary">
                  ${(product.price / 100).toFixed(2)}
                </p>
                <button className="btn btn-success mt-auto" onClick={() => handleAddToCart(product.id)}>
                  Kosárba
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
