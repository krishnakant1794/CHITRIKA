// chitri_frontend/src/pages/MyCartPage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext.jsx';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from '../utils/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { loadScript } from '../utils/helpers';
import { Trash2, Plus, Minus } from 'lucide-react';

const MyCartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser) {
        setLoadingProfile(false);
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to load your profile details.");
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchUserProfile();
  }, [currentUser]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * (item.painting.offerPrice || item.painting.price), 0);
  const totalAmount = subtotal;

  const handlePayment = async () => {
    const shippingAddress = userProfile?.homeAddress;
    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zip || !shippingAddress.country) {
      toast.error("Please provide your complete home address (including country) in your profile before placing an order.");
      navigate('/profile');
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoadingPayment(true);
    try {
      const receiptId = `order_${Date.now().toString().slice(-8)}_${currentUser.uid.slice(0, 10)}`;

      const createOrderRes = await axios.post(
        `/payments/create-order`,
        { amount: totalAmount, receipt: receiptId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      const { id: order_id, currency, amount: razorpayAmount } = createOrderRes.data;

      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        toast.error('Razorpay SDK failed to load. Are you online?');
        setLoadingPayment(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayAmount,
        currency: currency,
        name: "CHITRIKA Handmade Paintings",
        description: "Purchase of Handmade Paintings",
        order_id: order_id,
        handler: async function (response) {
          try {
            const orderDetails = {
              user: currentUser,
              // CRITICAL FIX: Explicitly check and include selectedSize/Color from item, defaulting to null
              items: cartItems.map(item => ({
                painting: item.painting._id,
                quantity: item.quantity,
                priceAtPurchase: item.painting.offerPrice || item.painting.price,
                selectedSize: item.selectedSize !== undefined ? item.selectedSize : null, // Explicit check for undefined
                selectedColor: item.selectedColor !== undefined ? item.selectedColor : null, // Explicit check for undefined
              })),
              shippingAddress: userProfile.homeAddress,
              totalAmount: totalAmount,
            };

            const verificationRes = await axios.post(
              `/payments/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderDetails: orderDetails,
              },
              { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            toast.success(verificationRes.data.message);
            clearCart();
            navigate('/orders');
          } catch (error) {
            console.error("Payment verification or order saving failed:", error);
            toast.error(error.response?.data?.message || "Payment verification failed.");
          }
        },
        prefill: {
          name: currentUser?.displayName || userProfile?.name || '',
          email: currentUser?.email || '',
          contact: userProfile?.phone || '8210061518',
        },
        notes: {
          address: `${userProfile.homeAddress.street}, ${userProfile.homeAddress.city}`,
        },
        theme: {
          color: "#988686"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('razorpay.payment.failed', function (response) {
        console.error("Razorpay Payment Failed:", response);
        toast.error(response.error?.description || "Payment failed. Please try again.");
      });
      rzp1.open();

    } catch (error) {
      console.error("Error during payment process:", error);
      toast.error(error.response?.data?.message || "Failed to initiate payment.");
    } finally {
      setLoadingPayment(false);
    }
  };

  if (loadingProfile) {
    return <LoadingSpinner message="Loading cart and profile..." />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-light font-serif flex flex-col">
      <Navbar />
      <main className="container mx-auto p-4 flex-grow mt-20">
        <h1 className="text-4xl font-bold text-taupe mb-8 text-center">My Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-deep-taupe p-8 rounded-lg shadow-xl text-center">
            <p className="text-xl text-gray-light mb-4">Your cart is empty!</p>
            <Button onClick={() => navigate('/')} variant="secondary">Start Shopping</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={`${item.painting._id}-${item.selectedSize || ''}-${item.selectedColor || ''}`} className="flex items-center bg-deep-taupe p-4 rounded-lg shadow-md">
                  <img
                    src={item.painting.images[0] || "https://placehold.co/100x100/5C4E4E/D1D0D0?text=No+Image"}
                    alt={item.painting.name}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold text-taupe">{item.painting.name}</h2>
                    {item.selectedSize && <p className="text-gray-400 text-sm">Size: {item.selectedSize}</p>}
                    {item.selectedColor && <p className="text-sm text-gray-400">Color: {item.selectedColor}</p>}
                    <p className="text-gray-light">
                      ₹{(item.painting.offerPrice || item.painting.price).toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <Button
                        onClick={() => updateQuantity(item.painting._id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                        variant="outline"
                        size="sm"
                        className="px-2 py-1"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-3 text-lg">{item.quantity}</span>
                      <Button
                        onClick={() => updateQuantity(item.painting._id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                        variant="outline"
                        size="sm"
                        className="px-2 py-1"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => removeFromCart(item.painting._id, item.selectedSize, item.selectedColor)}
                        variant="danger"
                        size="sm"
                        className="ml-auto px-2 py-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={clearCart} variant="secondary" className="w-full mt-4">Clear Cart</Button>
            </div>

            {/* Order Summary & Address */}
            <div className="lg:col-span-1 bg-deep-taupe p-6 rounded-lg shadow-xl h-fit">
              <h2 className="text-2xl font-bold text-taupe mb-4 border-b border-gray-700 pb-3">Order Summary</h2>
              <div className="flex justify-between text-lg mb-2">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white border-t border-gray-700 pt-3 mt-3">
                <span>Total:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>

              <h2 className="text-2xl font-bold text-taupe mt-8 mb-4 border-b border-gray-700 pb-3">Shipping Address</h2>
              {userProfile && userProfile.homeAddress && userProfile.homeAddress.street ? (
                <div className="text-gray-light space-y-1">
                  <p>{userProfile.name}</p>
                  <p>{userProfile.homeAddress.street}</p>
                  <p>{userProfile.homeAddress.city}, {userProfile.homeAddress.state} - {userProfile.homeAddress.zip}</p>
                  <p>{userProfile.homeAddress.country}</p>
                  <Button onClick={() => navigate('/profile')} variant="outline" size="sm" className="mt-4">
                    Edit Address
                  </Button>
                </div>
              ) : (
                <div className="text-gray-400">
                  <p className="mb-2">No home address found. Please add it in your profile.</p>
                  <Button onClick={() => navigate('/profile')} variant="secondary" size="sm">
                    Add Address Now
                  </Button>
                </div>
              )}

              <Button
                onClick={handlePayment}
                className="w-full mt-8 py-3 text-xl animate-pulse-shadow"
                disabled={cartItems.length === 0 || loadingPayment || !userProfile?.homeAddress?.street || !userProfile?.homeAddress?.city || !userProfile?.homeAddress?.state || !userProfile?.homeAddress?.zip || !userProfile?.homeAddress?.country}
                loading={loadingPayment}
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyCartPage;
