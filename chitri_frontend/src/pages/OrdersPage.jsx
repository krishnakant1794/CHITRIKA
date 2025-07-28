// chitri_frontend/src/pages/OrdersPage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/ui/Button';
import useAuth from '../hooks/useAuth';
import axios from '../utils/api';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/orders/my`, { // Fetch user-specific orders
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching user orders:", err);
        setError("Failed to load your orders. Please try again later.");
        toast.error("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentUser]);

  if (loading) {
    return <LoadingSpinner message="Loading your orders..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex flex-col items-center justify-center p-4">
        <p className="text-lg mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-light font-serif flex flex-col">
      <Navbar />
      <main className="container mx-auto p-4 flex-grow mt-20">
        <h1 className="text-4xl font-bold text-taupe mb-8 text-center">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-deep-taupe p-8 rounded-lg shadow-xl text-center">
            <p className="text-xl text-gray-light mb-4">You haven't placed any orders yet.</p>
            <Button onClick={() => navigate('/')} variant="secondary">Start Shopping</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-deep-taupe p-6 rounded-lg shadow-xl">
                <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
                  <h2 className="text-xl font-bold text-taupe">Order ID: <span className="text-gray-light">{order._id.slice(-8)}</span></h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${order.orderStatus === 'Delivered' ? 'bg-green-600 text-white' :
                      order.orderStatus === 'Cancelled' ? 'bg-red-600 text-white' :
                      'bg-taupe text-black'}`}>
                    {order.orderStatus}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-light mb-1"><strong>Ordered On:</strong> {format(new Date(order.orderedAt), 'dd MMMM yyyy, hh:mm a')}</p>
                  <p className="text-gray-light mb-1"><strong>Total Amount:</strong> ₹{order.totalAmount?.toFixed(2) || 'N/A'}</p>
                  <p className="text-gray-light"><strong>Shipping To:</strong> {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.zip}</p>
                </div>

                <h3 className="text-lg font-semibold text-taupe mb-3">Items:</h3>
                <ul className="space-y-3">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex items-center bg-gray-700 p-3 rounded-md">
                      <img
                        src={item.painting?.images?.[0] || "https://placehold.co/60x60/5C4E4E/D1D0D0?text=No+Image"}
                        alt={item.painting?.name || 'Painting'}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <p className="font-semibold text-gray-light">{item.painting?.name || 'Unknown Painting'}</p>
                        <p className="text-sm text-gray-400">Quantity: {item.quantity || 1}</p>
                        {item.selectedSize && <p className="text-sm text-gray-400">Size: {item.selectedSize}</p>}
                        {item.selectedColor && <p className="text-sm text-gray-400">Color: {item.selectedColor}</p>}
                        <p className="text-sm text-gray-400">Price: ₹{(item.priceAtPurchase?.toFixed(2)) || 'N/A'}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrdersPage;
