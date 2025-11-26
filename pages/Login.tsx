
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('seller@flipkart.com');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.login(email, password);
      navigate('/');
    } catch (err) {
      alert('Login failed. Use demo credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white max-w-md mx-auto flex flex-col justify-center px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">SellerHub</h1>
        <p className="text-gray-500">Grow your business online</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email / Mobile</label>
          <input 
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="text-right">
          <button type="button" className="text-sm text-blue-600 font-medium">Forgot Password?</button>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold text-lg shadow-lg active:scale-95 transition-transform"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          New to SellerHub? 
          <button 
            onClick={() => navigate('/signup')} 
            className="text-blue-600 font-bold ml-1"
          >
            Register Now
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
