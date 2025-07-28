// chitri_frontend/src/components/common/LoadingSpinner.jsx
import React from 'react';
import { SyncLoader } from 'react-spinners'; // Example spinner library

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-[100]">
      <SyncLoader color="#988686" loading={true} size={15} />
      <p className="mt-4 text-taupe text-lg font-semibold">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
