import Counter from './components/Counter';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="p-6">
      <Counter />
      <h1 className="text-3xl font-bold text-center my-6">Product Listing</h1>
      <ProductList />
    </div>
  );
}

export default App;
