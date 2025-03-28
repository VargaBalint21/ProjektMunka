import { useState } from 'react';
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Card,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  maxWidth: '500px',
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  padding: theme.spacing(2),
}));

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
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // 👈 Navigáláshoz

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
      await axios.post('http://localhost:8000/api/register', formData);
      setSuccess('Sikeres regisztráció! Átirányítás a bejelentkezéshez...');
      
      // kis késleltetés után átirányítás (pl. 2 másodperc múlva)
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Sikertelen regisztráció');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <RegisterContainer>
        <StyledCard variant="outlined">
          <Typography component="h1" variant="h4" textAlign="center">
            Regisztráció
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="last_name">Vezetéknév</FormLabel>
              <TextField
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                fullWidth
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="first_name">Keresztnév</FormLabel>
              <TextField
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                fullWidth
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Jelszó</FormLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
                inputProps={{ minLength: 8 }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password_confirmation">Jelszó megerősítése</FormLabel>
              <TextField
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                fullWidth
                inputProps={{ minLength: 8 }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="phone">Telefonszám</FormLabel>
              <TextField
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                required
                fullWidth
              />
            </FormControl>

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            {success && (
              <Typography color="primary" variant="body2">
                {success}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="success" disabled={loading}>
              {loading ? 'Regisztrálás...' : 'Regisztráció'}
            </Button>
          </Box>
        </StyledCard>
      </RegisterContainer>
    </>
  );
}

export default RegisterForm;
