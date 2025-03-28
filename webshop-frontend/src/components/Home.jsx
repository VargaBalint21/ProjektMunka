import { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState('login');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/products')
      .then(response => {
        console.log('API Response:', response.data);
        setProducts(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('A termékek betöltése nem sikerült. Próbáld újra később.');
        setLoading(false);
      });
  }, []);

  const toggleAuthMenu = () => {
    setShowAuthMenu(!showAuthMenu);
  };

  const handleTabChange = (tab) => {
    setActiveAuthTab(tab);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAuthMenu && !event.target.closest('.auth-menu') && !event.target.closest('.profile-button')) {
        setShowAuthMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAuthMenu]);

  if (loading) return <div className="text-center mt-5">Betöltés...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Termékeink</h1>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.length > 0 ? (
          products.map(product => (
            <div className="col" key={product.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`http://localhost:8000/images/${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/300x200?text=Product+Image';
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text fw-bold text-primary">
                    ${(product.price / 100).toFixed(2)}
                  </p>
                  <p className="card-text text-muted">Készleten: {product.stock}</p>
                  <button className="btn btn-success mt-auto">Kosárba</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">Nincsenek elérhető termékek.</div>
        )}
      </div>
    </div>
  );
}

export default Home;
