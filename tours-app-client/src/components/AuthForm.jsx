import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signupUser } from '../redux/authSlice';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState(''); // Only for signup

  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.auth);

  const handleSubmit = e => {
    e.preventDefault();

    if (status === 'loading') return;

    if (isLogin) {
      dispatch(loginUser({ email, password }));
    } else {
      if (password !== passwordConfirm) {
        alert('Passwords do not match!'); // Using simple alert for quick feedback here
        return;
      }
      dispatch(signupUser({ name, email, password, passwordConfirm }));
    }
  };

  const formTitle = isLogin ? 'Sign In to Natours' : 'Create an Account';
  const submitButtonText = isLogin ? 'Sign In' : 'Sign Up';

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-linear-to-br from-green-50 to-teal-100 font-[Inter]">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">{formTitle}</h2>

        {/* Error Message Display */}
        {status === 'failed' && (
          <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">
            {error.includes('401') ? 'Incorrect email or password.' : error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field (Only for Signup) */}
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
              />
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8} // Assuming minimum password length
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
            />
          </div>

          {/* Password Confirm Field (Only for Signup) */}
          {!isLogin && (
            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                required
                minLength={8}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 mt-6 text-lg bg-linear-to-r from-green-500 to-green-600 text-white font-bold rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition duration-150 disabled:opacity-50"
          >
            {status === 'loading' ? 'Processing...' : submitButtonText}
          </button>
        </form>

        {/* Toggle between Login and Signup */}
        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold text-green-600 hover:text-green-800 transition duration-150"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
