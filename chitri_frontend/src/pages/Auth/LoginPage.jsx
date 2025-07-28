// chitri_frontend/src/pages/Auth/LoginPage.jsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import { auth, googleProvider } from '../../utils/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // UPDATED: Move navigation logic into useEffect
  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true }); // Use replace to prevent going back to login
    }
  }, [currentUser, navigate]); // Depend on currentUser and navigate

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigation handled by useEffect after currentUser state updates
      toast.success('Logged in successfully!');
    } catch (error) {
      console.error("Email login error:", error);
      toast.error(error.message || "Failed to login with email and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // Navigation handled by useEffect after currentUser state updates
      toast.success('Logged in with Google successfully!');
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.message || "Failed to login with Google.");
    } finally {
      setLoading(false);
    }
  };

  // Only render the form if not already logged in (useEffect will handle redirect)
  if (currentUser) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-serif text-gray-light">
      <div className="bg-deep-taupe p-8 rounded-lg shadow-xl max-w-md w-full animate-fade-in ">
        <h2 className="text-4xl font-extrabold text-center text-taupe mb-6 tracking-wide ">CHITRIKA</h2>
        <p className="text-center text-gray-light mb-8">Login to discover exquisite handmade paintings.</p>

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-taupe rounded-md focus:outline-none focus:ring-2 focus:ring-taupe text-white"
              placeholder="your@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-taupe rounded-md focus:outline-none focus:ring-2 focus:ring-taupe text-white"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-taupe text-black py-3 rounded-md font-semibold text-lg hover:bg-deep-taupe hover:text-white transition duration-300 transform hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-deep-taupe text-white">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-gray-700 text-white py-3 rounded-md font-semibold text-lg hover:bg-gray-800 transition duration-300 transform hover:scale-105"
          disabled={loading}
        >
          <img src="/google-logo.png" alt="Google" className="w-6 h-6 mr-3" />
          {loading ? 'Signing In...' : 'Sign in with Google'}
        </button>

        <p className="mt-8 text-center text-white">
          Don't have an account?{' '}
          <Link to="/signup" className="text-white hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
