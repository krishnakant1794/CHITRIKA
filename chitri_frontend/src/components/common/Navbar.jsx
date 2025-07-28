// chitri_frontend/src/components/common/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { gsap } from 'gsap';
import { ShoppingCart, User, Home, List, LogOut, Menu, X, Paintbrush, ShieldCheck } from 'lucide-react';
import { CONTACT_PHONE } from '../../utils/constants';

const Navbar = () => {
  const { currentUser, userRole, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleCustomizeClick = () => {
    window.open(`https://wa.me/${CONTACT_PHONE}`, '_blank');
  };

  // GSAP animation for mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, { x: '0%', duration: 0.3, ease: 'power2.out' });
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
      } else {
        gsap.to(mobileMenuRef.current, {
          x: '-100%', duration: 0.3, ease: 'power2.in', onComplete: () => {
            document.body.style.overflow = ''; // Restore scrolling when menu is closed
          }
        });
      }
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [navigate]); // navigate is stable, but location.pathname would be more precise if passed

  return (
    <nav className="fixed top-0 left-0 w-full bg-deep-taupe bg-opacity-95 backdrop-blur-sm z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Paintbrush className="text-white h-8 w-8" />
          <span className="text-white text-2xl font-bold font-serif tracking-wider">CHITRIKA</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/">Home</NavLink>
          <NavLink onClick={handleCustomizeClick}>Customize</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          {userRole === 'admin' && <NavLink to="/admin">Admin</NavLink>}
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-taupe text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </NavLink>
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-light hover:text-white transition-colors duration-200 text-lg font-medium"
            >
              <LogOut className="h-5 w-5 mr-1" /> Logout
            </button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-light-green  bg-black focus:outline-none">
            {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 w-64 h-full bg-black shadow-xl transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:hidden z-40`}
      >
        <div className="p-6 pt-20 space-y-4">
          <MobileNavLink
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-light-green text-2xl flex items-center"
          >
            <Home className="h-5 w-5 mr-2" /> Home
          </MobileNavLink>

          <MobileNavLink
            onClick={() => { handleCustomizeClick(); setIsMobileMenuOpen(false); }}
            className="text-light-green text-2xl flex items-center"
          >
            <Paintbrush className="h-5 w-5 mr-2" /> Customize
          </MobileNavLink>

          <MobileNavLink
            to="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-light-green text-2xl flex items-center"
          >
            <User className="h-5 w-5 mr-2" /> Profile
          </MobileNavLink>

          {userRole === 'admin' && (
            <MobileNavLink
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-light-green text-2xl flex items-center"
            >
              <ShieldCheck className="h-5 w-5 mr-2" /> Admin
            </MobileNavLink>
          )}

          <MobileNavLink
            to="/orders"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-light-green text-2xl flex items-center"
          >
            <List className="h-5 w-5 mr-2" /> Orders
          </MobileNavLink>

          <MobileNavLink
            to="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-light-green text-2xl flex items-center"
          >
            <ShoppingCart className="h-5 w-5 mr-2" /> My Cart ({totalCartItems})
          </MobileNavLink>

          {currentUser ? (
            <button
              onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
              className="flex items-center w-full text-left py-2 px-3 rounded-md text-light-green hover:bg-taupe hover:text-black transition-colors duration-200 text-2xl font-medium"
            >
              <LogOut className="h-5 w-5 mr-2" /> Logout
            </button>
          ) : (
            <MobileNavLink
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-light-green text-2xl flex items-center"
            >
              <User className="h-5 w-5 mr-2" /> Login
            </MobileNavLink>
          )}
        </div>
      </div>

    </nav>
  );
};

const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-gray-light hover:text-white transition-colors duration-200 text-lg font-medium"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick, className = '' }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center py-2 px-3 rounded-md hover:bg-taupe hover:text-black transition-colors duration-200 text-2xl font-medium ${className}`}
  >
    {children}
  </Link>
);

export default Navbar;
