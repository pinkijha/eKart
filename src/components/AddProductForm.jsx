import { push, ref, update } from "firebase/database";
import { useState, useEffect } from "react";
import { database } from "../utils/firebase"; // Ensure proper import

const AddProductForm = ({ onClose, editingProduct }) => {
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Populate form fields when editingProduct changes
  useEffect(() => {
    if (editingProduct) {
      setProductName(editingProduct.productName || '');
      setBrand(editingProduct.brand || '');
      setCategory(editingProduct.category || '');
      setDescription(editingProduct.description || '');
      setPrice(editingProduct.price || '');
      setImageUrl(editingProduct.imageUrl || '');
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // Update existing product
        const productRef = ref(database, `products/${editingProduct.id}`);
        await update(productRef, {
          productName,
          brand,
          category,
          description,
          price: parseFloat(price),
          imageUrl,
        });
        alert("Product updated successfully!");
      } else {
        // Add new product
        const productRef = ref(database, "products");
        await push(productRef, {
          productName,
          brand,
          category,
          description,
          price: parseFloat(price),
          imageUrl,
          createdAt: new Date().toISOString(),
        });
        alert("Product added successfully!");
      }
      onClose(); // Close the form modal
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default AddProductForm;
