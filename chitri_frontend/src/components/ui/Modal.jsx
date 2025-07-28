// chitri_frontend/src/components/ui/Modal.jsx
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // UPDATED: Check if refs exist before animating
      if (overlayRef.current) {
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      }
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.9, y: -50 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
        );
      }
      document.body.style.overflow = 'hidden'; // Prevent scrolling background
    } else {
      // UPDATED: Check if refs exist before animating
      if (overlayRef.current) {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' });
      }
      if (modalRef.current) {
        gsap.to(
          modalRef.current,
          { opacity: 0, scale: 0.9, y: 50, duration: 0.4, ease: 'power2.in', onComplete: () => {
            document.body.style.overflow = ''; // Restore scrolling
          }}
        );
      } else {
          document.body.style.overflow = ''; // Ensure scroll is restored even if modalRef is null
      }
    }
  }, [isOpen]);

  // IMPORTANT: The modal should only render its DOM elements if isOpen is true.
  // If we return null when isOpen is false, the refs will be null, and GSAP will complain.
  // We need to keep it rendered but hidden, or handle GSAP animations on mount/unmount more carefully.
  // For now, let's keep the existing conditional render, but the GSAP null checks are vital.
  if (!isOpen && (!modalRef.current || modalRef.current.style.opacity === '0')) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 opacity-0"
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        ref={modalRef}
        className="bg-deep-taupe p-6 rounded-lg shadow-2xl max-w-lg w-full relative opacity-0 transform scale-90"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-light hover:text-taupe transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        {title && <h2 className="text-2xl font-bold text-taupe mb-4 border-b border-gray-700 pb-3">{title}</h2>}
        {/* Ensure max-h-[80vh] and overflow-y-auto are here for scrolling */}
        <div className="text-gray-light max-h-[80vh] overflow-y-auto pr-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
