import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('first_name', user.first_name);
      localStorage.setItem('user_id', user.id);
      const cartRes = await axios.get('http://localhost:8000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartRes.data));
      window.dispatchEvent(new Event('item-added-to-cart'));

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Sikertelen bejelentkezés');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Bejelentkezés</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email cím</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Jelszó</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Bejelentkezés...' : 'Bejelentkezés'}</button>
      </form>
    </div>
  );
}

export default LoginForm;