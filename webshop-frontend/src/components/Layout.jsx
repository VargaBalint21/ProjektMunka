import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton, Badge
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, setFirstName] = useState(localStorage.getItem('first_name'));
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    setFirstName(localStorage.getItem('first_name'));
  }, [location]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('first_name');
    localStorage.removeItem('cart');
    setFirstName(null);
    setCartItems([]);
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Button color="inherit" onClick={() => navigate('/?category_id=1')}>Irodaszerek</Button>
            <Button color="inherit" onClick={() => navigate('/?category_id=2')}>Iskolaszerek</Button>
            <Button color="inherit" onClick={() => navigate('/?category_id=3')}>Írószerek</Button>
          </Box>

          <Typography variant="h6" sx={{
            flexGrow: 1,
            textAlign: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>PapírPalota</Link>
          </Typography>

          <Box sx={{ display: 'flex' }}>
            {firstName ? (
              <>
                <IconButton color="inherit" onClick={() => navigate('/profile')}>
                  <AccountCircle />
                </IconButton>
                <IconButton color="inherit" onClick={() => navigate('/cart')}>
                  <Badge badgeContent={cartItems.reduce((sum, item) => sum + item.quantity, 0)} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Button color="inherit" onClick={handleLogout}>Kijelentkezés</Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/register')}>Regisztráció</Button>
                <Button color="inherit" onClick={() => navigate('/login')}>Belépés</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Outlet context={{ cartItems, setCartItems }} />
    </>
  );
};

export default Layout;
