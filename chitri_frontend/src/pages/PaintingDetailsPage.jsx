// chitri_frontend/src/pages/PaintingDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import PaintingSlideshow from '../components/paintings/PaintingSlideshow';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext.jsx';
import axios from '../utils/api';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Star } from 'lucide-react';

const PaintingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [painting, setPainting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(''); // State for selected size
  const [selectedColor, setSelectedColor] = useState(''); // State for selected color (for clothes)


  useEffect(() => {
    const fetchPainting = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/paintings/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPainting(response.data);
        // Initialize selected size/color if available
        if (response.data.availableSizes && response.data.availableSizes.length > 0) {
          setSelectedSize(response.data.availableSizes[0]);
        }
        if (response.data.availableColors && response.data.availableColors.length > 0) {
          setSelectedColor(response.data.availableColors[0]);
        }

      } catch (err) {
        console.error("Error fetching painting details:", err);
        setError("Failed to load painting details. It might not exist or there was a network error.");
        toast.error("Failed to load painting details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPainting();
  }, [id]);

  const handleAddToCart = () => {
    if (painting) {
      if (painting.category === 'Clothes') {
        if (!selectedSize) {
          toast.error("Please select a size.");
          return;
        }
        addToCart(painting, 1, selectedSize, selectedColor);
      } else {
        addToCart(painting, 1);
      }
    }
  };

  const handleBuyNow = () => {
    if (painting) {
      if (painting.category === 'Clothes') {
        if (!selectedSize) {
          toast.error("Please select a size.");
          return;
        }
        addToCart(painting, 1, selectedSize, selectedColor);
      } else {
        addToCart(painting, 1);
      }
      navigate('/cart');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading painting details..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex flex-col items-center justify-center p-4">
        <p className="text-lg mb-4">{error}</p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  if (!painting) {
    return (
      <div className="min-h-screen bg-black text-gray-light flex flex-col items-center justify-center p-4">
        <p className="text-lg mb-4">Painting not found.</p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  const displayImages = painting.images && painting.images.length > 0
    ? painting.images
    : ["https://placehold.co/800x600/5C4E4E/D1D0D0?text=No+Image"];

  let bulletPoints = painting.highlights || [];
  if (!bulletPoints.includes("All charges are inclusive")) {
      bulletPoints = [...bulletPoints, "All charges are inclusive"];
  }

  return (
    <div className="min-h-screen bg-black text-gray-light font-serif flex flex-col">
      <Navbar />
      <main className="container mx-auto p-4 flex-grow mt-20">
        {/* Responsive grid for details page */}
        <div className="bg-deep-taupe p-8 rounded-lg shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Slideshow - make it responsive */}
          <div className="w-full"> {/* Ensure it takes full width on small screens */}
            <PaintingSlideshow images={displayImages} />
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-taupe mb-4">
                {painting.name}
              </h1>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 flex items-center text-xl mr-2">
                  <Star className="h-5 w-5 fill-current mr-1" /> {painting.rating ? painting.rating.toFixed(1) : 'N/A'}
                </span>
                <span className="text-gray-400 text-sm">({Math.floor(Math.random() * 100) + 1} reviews)</span>
              </div>

              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-white mr-3">₹{painting.offerPrice ? painting.offerPrice.toFixed(2) : painting.price.toFixed(2)}</span>
                {painting.offerPrice && painting.offerPrice < painting.price && (
                  <>
                    <span className="text-xl line-through text-gray-500 mr-2">₹{painting.price.toFixed(2)}</span>
                    <span className="text-green-400 text-lg font-semibold">
                      {painting.offerPrice && painting.price ?
                        `${((1 - (painting.offerPrice / painting.price)) * 100).toFixed(0)}% OFF` : ''}
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-light leading-relaxed mb-6">{painting.description}</p>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-taupe mb-3">Specifications:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-light">
                  {bulletPoints.length > 0 ? (
                    bulletPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))
                  ) : (
                    <li>No specific details available.</li>
                  )}
                </ul>
              </div>

              {painting.category === 'Clothes' && (
                <div className="mb-6 space-y-4">
                  {painting.availableSizes && painting.availableSizes.length > 0 && (
                    <div>
                      <label htmlFor="size-select" className="block text-taupe text-sm font-medium mb-2">Select Size:</label>
                      <select
                        id="size-select"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-taupe rounded-md focus:outline-none focus:ring-2 focus:ring-taupe text-white"
                      >
                        {painting.availableSizes.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  {painting.availableColors && painting.availableColors.length > 0 && (
                    <div>
                      <label htmlFor="color-select" className="block text-taupe text-sm font-medium mb-2">Select Color:</label>
                      <select
                        id="color-select"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-taupe rounded-md focus:outline-none focus:ring-2 focus:ring-taupe text-white"
                        disabled={painting.availableColors.length === 1}
                      >
                        {painting.availableColors.map(color => (
                          <option key={color} value={color}>{color}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
              <Button onClick={handleAddToCart} variant="secondary" className="flex-1 py-3 text-lg">
                Add to Cart
              </Button>
              <Button onClick={handleBuyNow} variant="primary" className="flex-1 py-3 text-lg">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaintingDetailsPage;
