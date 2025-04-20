import { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Magyarország'
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('token');

  const countries = [
    'Magyarország', 'Ausztria', 'Belgium', 'Bulgária', 'Ciprus', 
    'Csehország', 'Dánia', 'Észtország', 'Finnország', 'Franciaország', 
    'Görögország', 'Horvátország', 'Hollandia', 'Írország', 'Lengyelország', 
    'Lettország', 'Litvánia', 'Luxemburg', 'Málta', 'Németország', 
    'Olaszország', 'Portugália', 'Románia', 'Spanyolország', 'Svédország', 
    'Szlovákia', 'Szlovénia', 'Egyesült Királyság'
  ];

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
    const { name, value } = e.target;
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
    
    setAddress({
      ...address,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!address.street || address.street.trim() === '') {
      newErrors.street = 'Az utca mező kitöltése kötelező';
    }
    
    if (!address.city || address.city.trim() === '') {
      newErrors.city = 'A város mező kitöltése kötelező';
    }
    
    if (!address.postal_code || address.postal_code.trim() === '') {
      newErrors.postal_code = 'Az irányítószám kitöltése kötelező';
    } else if (!/^\d{4,10}$/.test(address.postal_code.trim())) {
      newErrors.postal_code = 'Érvénytelen irányítószám formátum';
    }
    
    if (!address.country) {
      newErrors.country = 'Az ország kitöltése kötelező';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setErrors({});
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    
    const addressData = {
      street: address.street.trim(),
      city: address.city.trim(),
      state: address.state.trim(),
      postal_code: address.postal_code.trim(),
      country: address.country
    };
    
    console.log('Sending address data:', addressData);
    
    try {
      const response = await axios.post('http://localhost:8000/api/profile/address', addressData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('Success response:', response.data);
      setMessage('Cím sikeresen mentve!');
      setMessageType('info');
    } catch (err) {
      console.error('Error saving address:', err);
      
      if (err.response) {
        console.log('Error response data:', err.response.data);
        
        if (err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
          setMessage('Kérjük, javítsa a hibákat a megadott mezőkben.');
        } else if (err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage(`Hiba a cím mentése során! (${err.response.status}: ${err.response.statusText})`);
        }
      } else {
        setMessage('Hiba a cím mentése során! Kérjük, ellenőrizze az internetkapcsolatát.');
      }
      
      setMessageType('danger');
    } finally {
      setIsSubmitting(false);
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
      {message && <div className={`alert alert-${messageType}`}>{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Utca <span className="text-danger">*</span></label>
          <input 
            type="text" 
            name="street" 
            className={`form-control ${errors.street ? 'is-invalid' : ''}`} 
            value={address.street} 
            onChange={handleChange} 
            required 
          />
          {errors.street && <div className="invalid-feedback">{errors.street}</div>}
        </div>
        <div className="mb-3">
          <label>Város <span className="text-danger">*</span></label>
          <input 
            type="text" 
            name="city" 
            className={`form-control ${errors.city ? 'is-invalid' : ''}`} 
            value={address.city} 
            onChange={handleChange} 
            required 
          />
          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
        </div>
        <div className="mb-3">
          <label>Megye / Állam</label>
          <input 
            type="text" 
            name="state" 
            className={`form-control ${errors.state ? 'is-invalid' : ''}`} 
            value={address.state} 
            onChange={handleChange} 
          />
          {errors.state && <div className="invalid-feedback">{errors.state}</div>}
        </div>
        <div className="mb-3">
          <label>Irányítószám <span className="text-danger">*</span></label>
          <input 
            type="text" 
            name="postal_code" 
            className={`form-control ${errors.postal_code ? 'is-invalid' : ''}`} 
            value={address.postal_code} 
            onChange={handleChange} 
            required 
            pattern="\d{4,10}"
            placeholder="1234"
          />
          {errors.postal_code && <div className="invalid-feedback">{errors.postal_code}</div>}
          <small className="form-text text-muted">Csak számokat adjon meg</small>
        </div>
        <div className="mb-3">
          <label>Ország <span className="text-danger">*</span></label>
          <select 
            name="country" 
            className={`form-select ${errors.country ? 'is-invalid' : ''}`} 
            value={address.country || ''}
            onChange={handleChange} 
            required
          >
            <option value="" disabled>Kérjük válasszon országot</option>
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <div className="invalid-feedback">{errors.country}</div>}
        </div>
        <button 
          type="submit" 
          className="btn btn-success" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Mentés...
            </>
          ) : 'Mentés'}
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
