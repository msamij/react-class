import { useParams } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Laptop',
    price: '$999',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'High performance laptop.',
  },
  {
    id: 2,
    name: 'Phone',
    price: '$599',
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=704&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Smartphone with great features.',
  },
  {
    id: 3,
    name: 'Tablet',
    price: '$399',
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Lightweight and portable tablet.',
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="p-6">Product not found.</div>;
  }

  return (
    <div className="p-6">
      <img src={product.image} alt={product.name} className="w-64 h-64 object-cover mb-4" />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-lg text-gray-700 mb-2">{product.price}</p>
      <p className="text-gray-600">{product.description}</p>
    </div>
  );
};

export default ProductDetail;
