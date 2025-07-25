import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import context from '../context/AppContext';

const Login = () => {
  const auth = useContext(context);
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const api = await axios.post(
        'https://restart-gcl2.onrender.com/api/user/login',
        { email, password },
        { withCredentials: true }
      );
      toast.success(api.data.message);
      auth.setIsAuthanticated(true);
      navigate('/profile')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      auth.setIsAuthanticated(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-[91.6vh] bg-gray-100 flex items-center justify-center px-4 overflow-hidden">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login to Your Account
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`mt-2 py-2 rounded-md text-white transition duration-300 flex items-center justify-center ${loading
                  ? 'bg-orange-300 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600'
                }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{' '}
            <Link to="/register" className="text-orange-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
