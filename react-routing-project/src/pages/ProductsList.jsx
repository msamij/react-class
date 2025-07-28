import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Phone' },
  { id: 3, name: 'Tablet' },
];

const ProductsList = () => {
  return (
    <ul className="space-y-2">
      {products.map(product => (
        <li key={product.id}>
          <Link to={`${product.id}`} className="text-blue-600 hover:underline">
            {product.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;
