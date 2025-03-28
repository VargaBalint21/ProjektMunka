import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

function RegisterForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name:'',
    email: '',
    password: '',
    password_confirmation: '',
    phone:'',
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
    
    // Basic validation
    if (formData.password !== formData.password_confirmation) {
      setError('A két jelszó nem egyezik meg');
      return;
    }
    
    setLoading(true);
    
    try {
      // Replace with your actual registration API endpoint
      const response = await axios.post('http://localhost:8000/api/register', formData);
      alert('Regisztráció sikeres')
      // Handle successful registration (e.g., show success message, redirect to login)
    } catch (err) {
      setError(err.response?.data?.message || 'Sikertelen regisztráció');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="last_name">Vezetéknév</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="first_name">Keresztnév</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="register-email">Email</label>
        <input
          type="email"
          id="register-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="register-password">Jelszó</label>
        <input
          type="password"
          id="register-password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="8"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password_confirmation">Jelszó megerősítése</label>
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
          minLength="8"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Telefonszám</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      {error && <div className="form-error">{error}</div>}
      <button type="submit" className="form-submit" disabled={loading}>
        {loading ? 'Regisztrálás...' : 'Regisztráció'}
      </button>
    </form>
  );
}

export default RegisterForm;
