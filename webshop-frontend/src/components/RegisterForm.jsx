import { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('A két jelszó nem egyezik meg');
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      alert('Regisztráció sikeres');
    } catch (err) {
      setError(err.response?.data?.message || 'Sikertelen regisztráció');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Regisztráció</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">Vezetéknév</label>
          <input type="text" className="form-control" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">Keresztnév</label>
          <input type="text" className="form-control" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="register-email" className="form-label">Email</label>
          <input type="email" className="form-control" id="register-email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="register-password" className="form-label">Jelszó</label>
          <input type="password" className="form-control" id="register-password" name="password" value={formData.password} onChange={handleChange} required minLength="8" />
        </div>
        <div className="mb-3">
          <label htmlFor="password_confirmation" className="form-label">Jelszó megerősítése</label>
          <input type="password" className="form-control" id="password_confirmation" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required minLength="8" />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Telefonszám</label>
          <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Regisztrálás...' : 'Regisztráció'}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
