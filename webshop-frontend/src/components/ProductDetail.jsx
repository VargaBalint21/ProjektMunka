import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import {
  Container, Typography, Box, Button, Grid, Paper,
  CircularProgress, Alert, Breadcrumbs, Link, useMediaQuery, useTheme
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setCartItems } = useOutletContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8000/api/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setError('A termék betöltése nem sikerült.');
        setLoading(false);
      });
  }, [productId]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      await axios.post("http://localhost:8000/api/cart", {
        product_id: product.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const res = await axios.get("http://localhost:8000/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data);
    } catch (err) {
      console.error("Nem sikerült a kosárba rakás", err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error || 'A termék nem található.'}</Alert>
        <Box mt={2}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            variant="outlined" 
            onClick={() => navigate(-1)}
          >
            Vissza
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: isMobile ? 2 : 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link 
          color="inherit" 
          sx={{ cursor: 'pointer' }} 
          onClick={() => navigate('/')}
        >
          Főoldal
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>
      
      <Button 
        startIcon={<ArrowBackIcon />} 
        variant="outlined" 
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Vissza a termékekhez
      </Button>
      
      <Paper elevation={3} sx={{ p: isMobile ? 2 : 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'
          }}>
            <Box
              sx={{
                height: isMobile ? 250 : 400,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
                borderRadius: 2,
                p: 2
              }}
            >
              <img
                src={product.image || 'https://placehold.co/400x300?text=Nincs+kép'}
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://placehold.co/400x300?text=Nincs+kép';
                }}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant={isMobile ? "h5" : "h4"} component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            <Typography 
              variant="h5" 
              color="primary" 
              sx={{ 
                fontWeight: 'bold', 
                my: 2 
              }}
            >
              {product.price.toLocaleString('hu-HU')} Ft
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              {product.description}
            </Typography>
            
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              fullWidth={isMobile}
              sx={{ 
                py: 1.5,
                fontSize: isMobile ? '1rem' : '1.1rem'
              }}
            >
              Kosárba
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ProductDetail;
