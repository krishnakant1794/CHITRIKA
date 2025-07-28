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

// UPDATED: Import new policy pages
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import DeliveryInfoPage from './pages/DeliveryInfoPage';
import SecurePackagingPage from './pages/SecurePackagingPage';
import CancellationRefundsPage from './pages/CancellationRefundsPage';


function App() {
  const location = useLocation();
  const appContainerRef = useRef(null);
  const { loading: authLoading, isMobileMenuOpen } = useAuth();

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

  const mainContentClasses = `min-h-screen flex flex-col w-full bg-black text-gray-light font-serif ${isMobileMenuOpen ? 'hidden' : ''} md:block`;

  return (
    <div ref={appContainerRef} className={mainContentClasses}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />

        {/* UPDATED: Add routes for policy pages (publicly accessible) */}
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/delivery-information" element={<DeliveryInfoPage />} />
        <Route path="/secure-packaging" element={<SecurePackagingPage />} />
        <Route path="/cancellation-refunds" element={<CancellationRefundsPage />} />

        {/* Protected Routes for authenticated users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/painting/:id" element={<PaintingDetailsPage />} />
          <Route path="/cart" element={<MyCartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
