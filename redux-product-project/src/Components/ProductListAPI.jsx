import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { fetchProducts } from '../redux/productsSlice';

const ProductListAPI = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'LOADING') {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (status === 'FAILED') {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map(product => (
        <Card key={product.id} className="shadow-lg rounded-2xl">
          <CardMedia component="img" height="200" image={product.image} alt={product.title} className="object-contain p-4" />
          <CardContent>
            <Typography variant="h6" className="truncate">
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${product.price}
            </Typography>
            <Button variant="contained" color="primary" className="mt-2" onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductListAPI;
