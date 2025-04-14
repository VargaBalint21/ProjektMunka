import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import {
  Grid, Card, CardContent, Typography, Button,
  Container, CircularProgress, Alert, Box
} from '@mui/material';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Kezdő oldal
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { setCartItems } = useOutletContext();
  
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('category_id');

  useEffect(() => {
    setLoading(true);
    let url = `http://localhost:8000/api/products?page=${page}`;
    if (categoryId) {
      url += `&category_id=${categoryId}`;
    }

    axios.get(url)
      .then(response => {
        setProducts(response.data.data); // A termékek tömbje
        setTotalPages(response.data.last_page); // Az összes oldal száma
        setLoading(false);
      })
      .catch(() => {
        setError('A termékek betöltése nem sikerült.');
        setLoading(false);
      });
  }, [page, categoryId]); // Minden oldal váltáskor új adatokat tölt be

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

  if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;
  if (error) return <Container maxWidth="md" sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Container>;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Termékeink
      </Typography>

      <Grid container spacing={4}>
        {products.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                },
                maxWidth: 300,
                margin: '0 auto'
              }}>
                <Box sx={{ position: 'relative', width: '100%', paddingTop: '66.66%', overflow: 'hidden', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                  <img
                    src={product.image || 'https://placehold.co/400x300?text=Nincs+kép'}
                    alt={product.name}
                    onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=Nincs+kép'; }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>{product.description}</Typography>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary">{(product.price / 100).toFixed(2)} Ft</Typography>
                </CardContent>
                <Box px={2} pb={2}>
                  <Button variant="contained" fullWidth onClick={() => handleAddToCart(product.id)}>Kosárba</Button>
                </Box>
              </Card>
            </Grid>
        ))}
      </Grid>

      {/* Oldal navigáció */}
      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Előző
        </Button>
        <Box sx={{ mx: 2, display: 'flex', alignItems: 'center' }}>
          <Typography>{page} / {totalPages}</Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Következő
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
