import ProductList from './ProductList';

function App() {
  return (
    <div className="min-h-screen bg-blue-300 flex flex-col items-center justify-center gap-3.5 py-3">
      <h1 className="text-white text-3xl uppercase mb-4">Welcome to our products store</h1>
      <ProductList />
    </div>
  );
}

export default App;
