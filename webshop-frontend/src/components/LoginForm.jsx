import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  Card,
  Link,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  maxWidth: '450px',
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  padding: theme.spacing(2),
}));

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(false);
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
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      const { token, user } = response.data;

      // Remember me logika
      if (remember) {
        localStorage.setItem('token', token); // token elmentve tartósan
      } else {
        sessionStorage.setItem('token', token); // csak munkamenetre
      }

      alert('Sikeres bejelentkezés: ' + user.email);
      // Itt irányíthatod át pl. dashboardra, ha szeretnéd
    } catch (err) {
      setError(err.response?.data?.message || 'Sikertelen bejelentkezés.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <SignInContainer>
        <StyledCard variant="outlined">
          <Typography component="h1" variant="h4" textAlign="center">
            Bejelentkezés
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              />
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  color="primary"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
              }
              label="Emlékezz rám"
            />

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Bejelentkezés...' : 'Bejelentkezés'}
            </Button>

            <Link href="#" variant="body2" sx={{ alignSelf: 'center' }}>
              Elfelejtetted a jelszavad?
            </Link>
          </Box>

          <Divider>vagy</Divider>
          <Typography sx={{ textAlign: 'center' }}>
            Nincs fiókod? <Link href="/register">Regisztrálj</Link>
          </Typography>
        </StyledCard>
      </SignInContainer>
    </>
  );
}

export default LoginForm;
