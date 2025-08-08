import ProductCard from './ProductCart';

const sampleProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality noise-cancelling headphones',
    price: 99.99,
    image: 'https://cdn.pixabay.com/photo/2017/02/27/21/47/yogurt-2104327_1280.jpg',
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Track your fitness and notifications',
    price: 149.99,
    image: 'https://cdn.pixabay.com/photo/2015/03/04/09/55/walnut-658569_960_720.jpg',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    description: 'Portable and powerful sound',
    price: 79.99,
    image: 'https://cdn.pixabay.com/photo/2016/04/15/11/43/hotel-1330834_1280.jpg',
  },
  {
    id: 4,
    name: 'Drone Camera',
    description: 'Capture aerial views with ease',
    price: 199.99,
    image: 'https://cdn.pixabay.com/photo/2023/03/20/15/37/postcards-7865294_1280.jpg',
  },
];

const ProductList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {sampleProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
