import { push, ref, update } from "firebase/database";
import { useState, useEffect } from "react";
import { database } from "../../utils/firebase"; // Ensure proper import

const AddProductForm = ({ onClose, editingProduct, brands }) => {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Populate form fields when editingProduct changes
  useEffect(() => {
    if (editingProduct) {
      setProductName(editingProduct.productName || "");
      setBrand(editingProduct.brand || "");
      setCategory(editingProduct.category || "");
      setDescription(editingProduct.description || "");
      setPrice(editingProduct.price || "");
      setImageUrl(editingProduct.imageUrl || "");
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Check for missing required fields
    if (!productName || !brand || !category || !description || !price || !imageUrl) {
      return; // Stop form submission if any field is empty
    }

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
        alert("Product updated successfully!");
      } else {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className={`w-full p-2 border rounded focus:outline-none ${
          isSubmitted && !productName ? "border-red-500" : "border-gray-300"
        }`}
      />

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Brand <span className="text-red-500">*</span>
        </label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className={`w-full border rounded-lg p-2 ${
            isSubmitted && !brand ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="" disabled>
            Select a brand
          </option>
          {brands.map((b) => (
            <option key={b.id} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`w-full p-2 border rounded focus:outline-none ${
          isSubmitted && !category ? "border-red-500" : "border-gray-300"
        }`}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`w-full p-2 border rounded focus:outline-none ${
          isSubmitted && !description ? "border-red-500" : "border-gray-300"
        }`}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className={`w-full p-2 border rounded focus:outline-none ${
          isSubmitted && !price ? "border-red-500" : "border-gray-300"
        }`}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className={`w-full p-2 border rounded focus:outline-none ${
          isSubmitted && !imageUrl ? "border-red-500" : "border-gray-300"
        }`}
      />

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
      >
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default AddProductForm;
