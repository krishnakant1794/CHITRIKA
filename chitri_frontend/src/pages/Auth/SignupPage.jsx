// chitri_frontend/src/pages/Auth/SignupPage.jsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import { auth, googleProvider } from '../../utils/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // UPDATED: Move navigation logic into useEffect
  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true }); // Use replace to prevent going back to signup
    }
  }, [currentUser, navigate]); // Depend on currentUser and navigate

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Navigation handled by useEffect after currentUser state updates
      toast.success('Account created successfully! You are now logged in.');
    } catch (error) {
      console.error("Email signup error:", error);
      toast.error(error.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // Navigation handled by useEffect after currentUser state updates
      toast.success('Signed up with Google successfully! You are now logged in.');
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error(error.message || "Failed to sign up with Google.");
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
      <div className="bg-deep-taupe p-8 rounded-lg shadow-xl max-w-md w-full animate-fade-in">
        <h2 className="text-4xl font-extrabold text-center text-taupe mb-6 tracking-wide">CHITRIKA</h2>
        <p className="text-center text-gray-light mb-8">Create your account to explore our art collection.</p>

        <form onSubmit={handleEmailSignup} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-taupe text-sm font-medium mb-2">Email Address</label>
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
            <label htmlFor="password" className="block text-taupe text-sm font-medium mb-2">Password</label>
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
          <div>
            <label htmlFor="confirmPassword" className="block text-taupe text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-deep-taupe text-gray-400">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center bg-gray-700 text-white py-3 rounded-md font-semibold text-lg hover:bg-gray-800 transition duration-300 transform hover:scale-105"
          disabled={loading}
        >
          <img src="/google-logo.png" alt="Google" className="w-6 h-6 mr-3" />
          {loading ? 'Signing In...' : 'Sign up with Google'}
        </button>

        <p className="mt-8 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-taupe hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
