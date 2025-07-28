import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProductDetail from './pages/ProductDetail';
import Weather from './pages/Weather';
import ProductsList from './pages/ProductsList';
import ProductNestedDetail from './pages/ProductNestedDetail';
import ProductsLayout from './pages/ProductsLayout';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/products" element={<ProductsLayout />}>
          <Route index element={<ProductsList />} />
          <Route path=":id" element={<ProductNestedDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
