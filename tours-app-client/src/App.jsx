import { useDispatch, useSelector } from 'react-redux';
import AuthForm from './components/AuthForm';
import ToursList from './components/ToursList';

const Header = ({ user, handleLogout }) => (
  <header className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-10">
    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-green-600 to-teal-500">
      Natours Booking App
    </h1>
    <div className="flex items-center space-x-4">
      <span className="text-gray-600 font-medium hidden sm:inline">Welcome, {user.name}</span>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-150"
      >
        Logout
      </button>
    </div>
  </header>
);

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Conditional Rendering based on Authentication Status
  if (!isAuthenticated) {
    // If not authenticated, show the AuthForm (Login/Signup)
    return <AuthForm />;
  }

  return (
    // Beautiful nature-inspired gradient background
    <div className="min-h-screen bg-linear-to-br from-green-50 to-teal-100">
      <Header user={user} handleLogout={handleLogout} />
      <ToursList />
    </div>
  );
}

export default App;
