// chitri_frontend/src/components/paintings/PaintingSlideshow.jsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const PaintingSlideshow = ({ images }) => {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 sm:h-96 bg-gray-800 flex items-center justify-center rounded-lg shadow-inner"> {/* Adjusted height for mobile */}
        <p className="text-gray-400">No images available for this painting.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-xl">
      <Carousel
        showArrows={true}
        showStatus={false}
        showIndicators={true}
        showThumbs={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        transitionTime={500}
        stopOnHover={true}
        className="carousel-container"
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-64 sm:h-96 flex items-center justify-center bg-black"> {/* Adjusted height for mobile */}
            <img
              src={image}
              alt={`Painting view ${index + 1}`}
              className="max-h-full max-w-full object-contain rounded-lg"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/5C4E4E/D1D0D0?text=Image+Error"; }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PaintingSlideshow;
