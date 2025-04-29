import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState('+36');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'secondary';
    if (passwordStrength <= 2) return 'warning';
    return 'success';
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return 'Gyenge';
    if (passwordStrength === 1) return 'Gyenge';
    if (passwordStrength === 2) return 'Közepes';
    if (passwordStrength === 3) return 'Jó';
    return 'Erős';
  };

  const handlePhonePrefixChange = (e) => {
    setPhonePrefix(e.target.value);
  };

  const handlePhoneChange = (e) => {
    let phoneValue = e.target.value;
    if (phoneValue.startsWith('+')) {
      phoneValue = phoneValue.substring(phoneValue.indexOf(' ') + 1);
    }
    
    setFormData({
      ...formData,
      phone: phonePrefix + ' ' + phoneValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.password_confirmation) {
      setError('A két jelszó nem egyezik meg');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      setSuccess('Sikeres regisztráció! Átirányítás a bejelentkezéshez...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Sikertelen regisztráció');
    } finally {
      setLoading(false);
    }
  };

  const countryCodes = [
    { code: '+36', country: 'Magyarország' },
    { code: '+43', country: 'Ausztria' },
    { code: '+32', country: 'Belgium' },
    { code: '+359', country: 'Bulgária' },
    { code: '+357', country: 'Ciprus' },
    { code: '+420', country: 'Csehország' },
    { code: '+45', country: 'Dánia' },
    { code: '+372', country: 'Észtország' },
    { code: '+358', country: 'Finnország' },
    { code: '+33', country: 'Franciaország' },
    { code: '+30', country: 'Görögország' },
    { code: '+385', country: 'Horvátország' },
    { code: '+31', country: 'Hollandia' },
    { code: '+353', country: 'Írország' },
    { code: '+48', country: 'Lengyelország' },
    { code: '+371', country: 'Lettország' },
    { code: '+370', country: 'Litvánia' },
    { code: '+352', country: 'Luxemburg' },
    { code: '+356', country: 'Málta' },
    { code: '+49', country: 'Németország' },
    { code: '+39', country: 'Olaszország' },
    { code: '+351', country: 'Portugália' },
    { code: '+40', country: 'Románia' },
    { code: '+34', country: 'Spanyolország' },
    { code: '+46', country: 'Svédország' },
    { code: '+421', country: 'Szlovákia' },
    { code: '+386', country: 'Szlovénia' },
    { code: '+44', country: 'Egyesült Királyság' },
  ];

  const countries = [
    'Magyarország', 'Ausztria', 'Németország', 'Olaszország', 'Franciaország', 
    'Spanyolország', 'Portugália', 'Egyesült Királyság', 'Írország', 'Hollandia', 
    'Belgium', 'Luxemburg', 'Dánia', 'Svédország', 'Finnország', 'Norvégia', 
    'Lengyelország', 'Csehország', 'Szlovákia', 'Románia', 'Bulgária', 'Görögország', 
    'Horvátország', 'Szerbia', 'Szlovénia', 'Svájc'
  ];

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="mb-4 text-center">Regisztráció</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="last_name" className="form-label">Vezetéknév <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="last_name" 
                      name="last_name" 
                      value={formData.last_name} 
                      onChange={handleChange} 
                      required 
                      placeholder="Vezetéknév"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="first_name" className="form-label">Keresztnév <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="first_name" 
                      name="first_name" 
                      value={formData.first_name} 
                      onChange={handleChange} 
                      required 
                      placeholder="Keresztnév"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="register-email" className="form-label">Email cím <span className="text-danger">*</span></label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="register-email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    placeholder="pelda@email.com"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="register-password" className="form-label">Jelszó <span className="text-danger">*</span></label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="register-password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                    minLength="8" 
                    placeholder="Legalább 8 karakter"
                  />
                  {formData.password && (
                    <div className="mt-1">
                      <div className="progress" style={{ height: '5px' }}>
                        <div 
                          className={`progress-bar bg-${getStrengthColor()}`} 
                          role="progressbar" 
                          style={{ width: `${passwordStrength * 25}%` }} 
                          aria-valuenow={passwordStrength * 25} 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <small className={`form-text text-${getStrengthColor()}`}>
                        Jelszó erőssége: {getStrengthLabel()}
                      </small>
                    </div>
                  )}
                  <small className="form-text text-muted">
                    Erős jelszó tartalmaz nagybetűt, számot és speciális karaktert is.
                  </small>
                </div>

                <div className="mb-3">
                  <label htmlFor="password_confirmation" className="form-label">Jelszó megerősítése <span className="text-danger">*</span></label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password_confirmation" 
                    name="password_confirmation" 
                    value={formData.password_confirmation} 
                    onChange={handleChange} 
                    required 
                    minLength="8" 
                    placeholder="Jelszó újra"
                  />
                  {formData.password && formData.password_confirmation && formData.password !== formData.password_confirmation && (
                    <small className="form-text text-danger">A jelszavak nem egyeznek meg!</small>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Telefonszám <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <select 
                      className="form-select" 
                      style={{ maxWidth: '120px' }} 
                      value={phonePrefix} 
                      onChange={handlePhonePrefixChange}
                    >
                      {countryCodes.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.code} ({country.country})
                        </option>
                      ))}
                    </select>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="phone" 
                      name="phone" 
                      onChange={handlePhoneChange} 
                      required 
                      placeholder="20 123 4567"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="country" className="form-label">Ország</label>
                  <select 
                    className="form-select" 
                    id="country" 
                    name="country" 
                    onChange={handleChange} 
                    defaultValue="Magyarország"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-success btn-lg" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Regisztrálás...
                      </>
                    ) : 'Regisztráció'}
                  </button>
                </div>
                
                <div className="text-center mt-3">
                  <p>Már regisztrált? <a href="/login" className="text-decoration-none">Bejelentkezés</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
