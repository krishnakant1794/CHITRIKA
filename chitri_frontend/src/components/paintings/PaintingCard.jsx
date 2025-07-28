// Example for a PaintingCard.jsx for GSAP hover
// src/components/paintings/PaintingCard.jsx
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const PaintingCard = ({ painting }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Apply GSAP hover effects
    const tl = gsap.timeline({ paused: true });
    tl.to(card, {
      scale: 1.05,
      boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
      duration: 0.3,
      ease: "power2.out"
    });

    card.addEventListener('mouseenter', () => tl.play());
    card.addEventListener('mouseleave', () => tl.reverse());

    return () => {
      card.removeEventListener('mouseenter', () => tl.play());
      card.removeEventListener('mouseleave', () => tl.reverse());
    };
  }, []);

  // For a more advanced 3D tilt effect on hover, you'd need to listen to mousemove
  // and update transform: rotateX/rotateY based on mouse position relative to center of card.
  // This can be done with GSAP's set() or to() on mousemove.

  return (
    <Link to={`/painting/${painting._id}`} className="block">
      <div
        ref={cardRef}
        className="bg-deep-taupe rounded-lg shadow-xl overflow-hidden cursor-pointer
                   transition-transform duration-300 ease-in-out transform
                   hover:scale-105 hover:shadow-2xl relative group"
        // Add perspective and preserve-3d to parent for proper 3D transform
        style={{ perspective: '1000px' }}
      >
        <img
          src={painting.images?.[0] || "https://placehold.co/600x400/5C4E4E/D1D0D0?text=No+Image"} // <-- This line uses the image URL
          alt={painting.name}
          className="w-full h-48 object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-in-out"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/5C4E4E/D1D0D0?text=Error"; }}
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-white mb-2">{painting.name}</h3>
          <p className="text-white text-sm mb-2 line-clamp-2">{painting.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-semibold text-white">₹{painting.offerPrice}</span>
            {painting.price && painting.offerPrice < painting.price && (
              <span className="text-sm line-through text-white ml-2">₹{painting.price}</span>
            )}
            {/* Add rating display here */}
            <span className="text-yellow-400 text-sm">⭐ {painting.rating || 'N/A'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PaintingCard;