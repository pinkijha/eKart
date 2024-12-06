import React, { useState } from "react";
import { ref, set, update } from "firebase/database";
import { database } from "../../utils/firebase";

const AddBrandsForm = ({ editingBrand, onClose }) => {
  const [brand, setBrand] = useState(
    editingBrand || { name: "", description: "", logo: "" }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrand((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBrand) {
        await update(ref(database, `brands/${editingBrand.id}`), brand);
        alert("Brand updated successfully!");
      } else {
        const newBrandRef = ref(database, `brands/${Date.now()}`);
        await set(newBrandRef, brand);
        alert("Brand added successfully!");
      }
      onClose();
    } catch (error) {
      console.error("Error saving brand:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Brand Name</label>
        <input
          type="text"
          name="name"
          value={brand.name}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={brand.description}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          rows="4"
          required
        ></textarea>
      </div>
      <div>
        <label className="block font-medium mb-1">Logo URL</label>
        <input
          type="text"
          name="logo"
          value={brand.logo}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editingBrand ? "Update Brand" : "Add Brand"}
        </button>
      </div>
    </form>
  );
};

export default AddBrandsForm;
