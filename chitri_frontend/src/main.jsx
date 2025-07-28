// chitri_frontend/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css'; // TailwindCSS imports
import { AuthProvider } from './context/AuthContext.jsx'; // Ensure .jsx extension
import { CartProvider } from './context/CartContext.jsx'; // Ensure .jsx extension
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <CartProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </CartProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
