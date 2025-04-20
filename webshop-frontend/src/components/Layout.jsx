import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton, Badge,
  Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [firstName, setFirstName] = useState(localStorage.getItem('first_name'));
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const categoryLinks = [
    { label: "Irodaszerek", id: 1 },
    { label: "Iskolaszerek", id: 2 },
    { label: "Írószerek", id: 3 }
  ];

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
      <List>
        {categoryLinks.map((link) => (
          <ListItem button key={link.id} onClick={() => navigate(`/?category_id=${link.id}`)}>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
        {firstName ? (
          <>
            <ListItem button onClick={() => navigate('/profile')}>
              <ListItemText primary="Profilom" />
            </ListItem>
            <ListItem button onClick={() => navigate('/cart')}>
              <ListItemText primary="Kosár" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Kijelentkezés" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => navigate('/register')}>
              <ListItemText primary="Regisztráció" />
            </ListItem>
            <ListItem button onClick={() => navigate('/login')}>
              <ListItemText primary="Belépés" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                {drawerContent}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex' }}>
              {categoryLinks.map((link) => (
                <Button key={link.id} color="inherit" onClick={() => navigate(`/?category_id=${link.id}`)}>
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              maxWidth: '60%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' } }}
            >
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                PapírPalota
              </Link>
            </Typography>
          </Box>

          {!isMobile && (
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
          )}
        </Toolbar>
      </AppBar>

      <Outlet context={{ cartItems, setCartItems }} />
    </>
  );
};

export default Layout;
