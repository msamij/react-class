import { Outlet } from 'react-router-dom';

const ProductsLayout = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Our Products</h1>
      <Outlet />
    </div>
  );
};

export default ProductsLayout;
