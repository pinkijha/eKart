import React from 'react';
import { ref, update } from 'firebase/database';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (editingProduct) {
        const productRef = ref(database, `products/${editingProduct.id}`);
        await update(productRef, {
          productName,
          brand,
          category,
          description,
          price: parseFloat(price),
          imageUrl,
        });
        alert('Product updated successfully!');
      } else {
        const productRef = ref(database, 'products');
        await push(productRef, {
          productName,
          brand,
          category,
          description,
          price: parseFloat(price),
          imageUrl,
          createdAt: new Date().toISOString(),
        });
        alert('Product added successfully!');
      }
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
