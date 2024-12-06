import React from "react";

const BrandModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg">
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BrandModal;
