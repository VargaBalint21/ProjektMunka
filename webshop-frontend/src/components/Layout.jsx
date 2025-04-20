import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton, Badge,
  Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery,
  Container, Grid, Divider, Paper
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
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

      <Box sx={{ flexGrow: 1 }}>
        <Outlet context={{ cartItems, setCartItems }} />
      </Box>

      {/* Footer */}
      <Paper 
        component="footer" 
        square 
        elevation={3}
        sx={{ 
          mt: 5, 
          py: isMobile ? 3 : 2,
          backgroundColor: (theme) => theme.palette.primary.main,
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={isMobile ? 3 : 2} justifyContent="space-between">
            <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant={isMobile ? "h6" : "subtitle1"} gutterBottom>
                PapírPalota
              </Typography>
              <Typography variant="body2" sx={{ fontSize: isMobile ? 'inherit' : '0.875rem' }}>
                Minőségi irodaszerek, iskolaszerek és írószerek széles választéka.
              </Typography>
              <Box sx={{ mt: isMobile ? 2 : 1, display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                <IconButton color="inherit" aria-label="Facebook" size={isMobile ? "medium" : "small"}>
                  <FacebookIcon fontSize={isMobile ? "medium" : "small"} />
                </IconButton>
                <IconButton color="inherit" aria-label="Instagram" size={isMobile ? "medium" : "small"}>
                  <InstagramIcon fontSize={isMobile ? "medium" : "small"} />
                </IconButton>
                <IconButton color="inherit" aria-label="Email" size={isMobile ? "medium" : "small"}>
                  <EmailIcon fontSize={isMobile ? "medium" : "small"} />
                </IconButton>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <Typography variant={isMobile ? "h6" : "subtitle1"} gutterBottom>
                Kategóriák
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {categoryLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={`/?category_id=${link.id}`}
                    style={{ 
                      color: 'white', 
                      textDecoration: 'none', 
                      margin: isMobile ? '4px 0' : '2px 0',
                      fontSize: isMobile ? 'inherit' : '0.875rem'
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
              <Typography variant={isMobile ? "h6" : "subtitle1"} gutterBottom>
                Elérhetőség
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: { xs: 'center', sm: 'flex-end' }, 
                  mb: isMobile ? 1 : 0.5,
                  fontSize: isMobile ? 'inherit' : '0.875rem'
                }}
              >
                <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                1234 Budapest, Minta utca 1.
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: { xs: 'center', sm: 'flex-end' }, 
                  mb: isMobile ? 1 : 0.5,
                  fontSize: isMobile ? 'inherit' : '0.875rem'
                }}
              >
                <LocalPhoneIcon fontSize="small" sx={{ mr: 1 }} />
                +36 20 123 4567
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: { xs: 'center', sm: 'flex-end' },
                  fontSize: isMobile ? 'inherit' : '0.875rem'
                }}
              >
                <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                info@papirpalota.hu
              </Typography>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: isMobile ? 2 : 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
          
          <Typography variant="body2" align="center" sx={{ pt: 0.5, fontSize: isMobile ? 'inherit' : '0.75rem' }}>
            © {new Date().getFullYear()} PapírPalota. Minden jog fenntartva.
          </Typography>
        </Container>
      </Paper>
    </Box>
  );
};

export default Layout;
