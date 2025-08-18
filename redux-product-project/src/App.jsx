import Cart from './Components/Cart';
import ProductList from './Components/ProductList';
import ProductListAPI from './Components/ProductListAPI';

function App() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center my-6">Product Listing</h1>
      <h2 className="text-xl font-semibold ml-6">Hardcoded Products</h2>
      <ProductList />

      <h2 className="text-xl font-semibold ml-6 mt-10">API Products</h2>
      <ProductListAPI />

      <Cart />
    </div>
  );
}

export default App;
