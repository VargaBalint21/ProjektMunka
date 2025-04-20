import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import {
  Grid, Card, CardContent, Typography, Button,
  Container, CircularProgress, Alert, Box,
  Select, MenuItem, InputLabel, FormControl, useMediaQuery, useTheme,
  CardActionArea
} from '@mui/material';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('default');
  const navigate = useNavigate();
  const location = useLocation();
  const { setCartItems } = useOutletContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('category_id');

  useEffect(() => {
    setLoading(true);
    let url = 'http://localhost:8000/api/products';
    if (categoryId) {
      url += `?category_id=${categoryId}`;
    }

    axios.get(url)
      .then(response => {
        setProducts(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('A termékek betöltése nem sikerült.');
        setLoading(false);
      });
  }, [categoryId]);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      await axios.post("http://localhost:8000/api/cart", {
        product_id: productId
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

  const getSortedProducts = () => {
    if (sortOrder === 'asc') {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  };

  const sortedProducts = getSortedProducts();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: isMobile ? 2 : 5, px: isMobile ? 1 : 2 }}>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        align="center" 
        fontWeight="bold" 
        gutterBottom
        sx={{ mt: isMobile ? 1 : 2 }}
      >
        Termékeink
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mb: isMobile ? 2 : 3,
        width: '100%' 
      }}>
        <FormControl size="small" sx={{ minWidth: isMobile ? '80%' : 200 }}>
          <InputLabel id="sort-label">Rendezés ár szerint</InputLabel>
          <Select
            labelId="sort-label"
            value={sortOrder}
            label="Rendezés ár szerint"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="default">Alapértelmezett</MenuItem>
            <MenuItem value="asc">Ár szerint növekvő</MenuItem>
            <MenuItem value="desc">Ár szerint csökkenő</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
        {sortedProducts.map((product, index) => (
          <Grid 
            item 
            xs={6} 
            sm={6} 
            md={4} 
            lg={3} 
            key={product.id}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Card sx={{
              height: isMobile ? 320 : 440,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              boxShadow: sortOrder === 'default' && index < 3 && !categoryId ? 6 : 3,
              border: sortOrder === 'default' && index < 3 && !categoryId ? '2px solid #eb6816' : undefined,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: isMobile ? 'none' : 'translateY(-5px)',
                boxShadow: 6
              },
              width: isMobile ? '100%' : '280px',
              margin: '0 auto'
            }}>
              <CardActionArea 
                onClick={() => navigate(`/product/${product.id}`)}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
              >
                <Box sx={{
                  width: '100%',
                  height: isMobile ? 140 : 200,
                  overflow: 'hidden',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#f5f5f5'
                }}>
                  <img
                    src={product.image || 'https://placehold.co/400x300?text=Nincs+kép'}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400x300?text=Nincs+kép';
                    }}
                    style={{
                      maxWidth: '90%',
                      maxHeight: '90%',
                      objectFit: 'contain',
                      padding: '8px'
                    }}
                  />
                </Box>
                <CardContent sx={{ 
                  flexGrow: 1, 
                  padding: isMobile ? '8px 12px' : '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: 'auto',
                  minHeight: isMobile ? '120px' : '160px',
                }}>
                  <Typography 
                    variant={isMobile ? "subtitle1" : "h6"} 
                    gutterBottom 
                    sx={{
                      fontSize: isMobile ? '0.9rem' : undefined,
                      lineHeight: isMobile ? 1.2 : 1.4,
                      mb: 1,
                      height: isMobile ? '2.4rem' : '3.8rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      wordBreak: 'break-word'
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{
                      display: isMobile ? 'none' : '-webkit-box', 
                      fontSize: isMobile ? '0.75rem' : undefined,
                      mb: 2,
                      flexGrow: 1,
                      maxHeight: '2.4rem',
                      lineHeight: '1.2rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    fontWeight="bold" 
                    color="primary"
                    sx={{ 
                      fontSize: isMobile ? '0.9rem' : undefined,
                      mt: 'auto'
                    }}
                  >
                    {product.price.toLocaleString('hu-HU')} Ft
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box px={isMobile ? 1 : 2} pb={isMobile ? 1 : 2} width="100%">
                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={() => handleAddToCart(product.id)}
                  size={isMobile ? "small" : "medium"}
                >
                  Kosárba
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
