// chitri_frontend/App.jsx
import React, { useLayoutEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import HomePage from './pages/HomePage';
import PaintingDetailsPage from './pages/PaintingDetailsPage';
import MyCartPage from './pages/MyCartPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import OrdersPage from './pages/OrdersPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import useAuth from './hooks/useAuth';
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
  const location = useLocation();
  const appContainerRef = useRef(null);
  const { loading: authLoading } = useAuth();

  useLayoutEffect(() => {
    if (appContainerRef.current) {
      gsap.fromTo(
        appContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [location]);

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    // Ensure this main container is always flexible and takes full height/width
    <div ref={appContainerRef} className="min-h-screen flex flex-col w-full bg-black text-gray-light font-serif">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/painting/:id" element={<PaintingDetailsPage />} />
          <Route path="/cart" element={<MyCartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
