import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import Product from './Product';

function ProductList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-white text-3xl">LOADING DATA...</p>;
  if (error) return <p className="text-red-400 text-4xl">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10">
      {items.map(product => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
}

export default ProductList;
