import { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  
  useEffect(() => {
    axios.get('http://localhost:8000/api/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(err => console.error('Hiba a user adatok betöltésénél', err));

    axios.get('http://localhost:8000/api/profile/address', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data) setAddress(res.data);
    })
    .catch(err => {
      console.warn('Nincs mentett cím:', err);
    });
  }, []);

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/profile/address', address, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Cím sikeresen mentve!');
    } catch (err) {
      setMessage('Hiba a cím mentése során!');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Profil</h2>

      {user && (
        <div className="mb-4">
          <p><strong>Vezetéknév:</strong> {user.last_name}</p>
          <p><strong>Keresztnév:</strong> {user.first_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Telefonszám:</strong> {user.phone || 'Nincs megadva'}</p>
        </div>
      )}

      <h4>Cím megadása / módosítása</h4>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Utca</label>
          <input type="text" name="street" className="form-control" value={address.street} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Város</label>
          <input type="text" name="city" className="form-control" value={address.city} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Megye / Állam</label>
          <input type="text" name="state" className="form-control" value={address.state} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Irányítószám</label>
          <input type="text" name="postal_code" className="form-control" value={address.postal_code} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Ország</label>
          <input type="text" name="country" className="form-control" value={address.country} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Mentés</button>
      </form>
    </div>
  );
}

export default ProfilePage;
