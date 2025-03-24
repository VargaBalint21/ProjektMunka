import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

function App() {
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
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  }, []);

  const toggleAuthMenu = () => {
    setShowAuthMenu(!showAuthMenu);
  };

  const handleTabChange = (tab) => {
    setActiveAuthTab(tab);
  };

  // Close auth menu when clicking outside of it
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

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <header className="header">
        <h1>Online Shop</h1>
        <div className="profile-button" onClick={toggleAuthMenu}>
          <span>👤</span>
        </div>
        
        {showAuthMenu && (
          <div className="auth-menu">
            <div className="auth-tabs">
              <button 
                className={`auth-tab ${activeAuthTab === 'login' ? 'active' : ''}`}
                onClick={() => handleTabChange('login')}
              >
                Login
              </button>
              <button 
                className={`auth-tab ${activeAuthTab === 'register' ? 'active' : ''}`}
                onClick={() => handleTabChange('register')}
              >
                Register
              </button>
            </div>
            
            {activeAuthTab === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>
        )}
      </header>
      
      <div className="container">
        <h1>Our Products</h1>
        <div className="products-grid">
          {products.length > 0 ? (
            products.map(product => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  {/* Use a placeholder image if actual image can't be loaded */}
                  <img
                    src={`http://localhost:8000/images/${product.image}`}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://placehold.co/300x200?text=Product+Image'
                    }}
                  />
                </div>
                <div className="product-details">
                  <h2>{product.name}</h2>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${(product.price / 100).toFixed(2)}</p>
                  <p className="product-stock">In stock: {product.stock}</p>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </div>
            ))
          ) : (
            <div>No products found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App
