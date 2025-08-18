import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card className="w-full max-w-sm shadow-md">
      <CardMedia component={'img'} height="160" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {product.description}
        </Typography>
        <Typography className="mt-2 font-bold">${product.price}</Typography>
        <Button variant="contained" size="small" className="mt-4" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
