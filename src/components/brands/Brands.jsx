import React, { useState, useEffect } from "react";
import Header from "../Header";
import BrandModal from "./BrandModal";
import AddBrandsForm from "./AddBrandsForm";
import { ref, onValue, remove } from "firebase/database";
import { database } from "../../utils/firebase";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaEye, FaPlusSquare } from "react-icons/fa";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [viewBrand, setViewBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredBrandList, setFilteredBrandList] = useState([]); // State for filtered list

  // Fetch brands data from Firebase Realtime Database
  const fetchBrands = () => {
    const brandsRef = ref(database, "brands");
    onValue(brandsRef, (snapshot) => {
      const data = snapshot.val();
      const brandList = data
        ? Object.entries(data).map(([id, details]) => ({
            id,
            ...details,
          }))
        : [];
      setBrands(brandList);
      setFilteredBrandList(brandList); // Initialize filtered list
    });
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Handle search query change
  const handleSearch = (query) => {
    setSearchTerm(query);
    const filteredBrands = brands.filter((brand) =>
      brand.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBrandList(filteredBrands); // Update filtered list
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBrand(null);
  };

  const handleDeleteBrand = async (id) => {
    try {
      await remove(ref(database, `brands/${id}`));
      alert("Brand deleted successfully!");
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  const handleViewBrand = (brand) => {
    setViewBrand(brand);
    setIsViewModalOpen(true);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="flex flex-col items-center mt-5">
        <h2 className="text-2xl font-bold text-blue-900 mb-5">Brands List</h2>

        <div className="relative">
          <button
            onClick={handleOpenModal}
            className="absolute -top-10 hover:scale-90 right-0 text-4xl text-orange-600"
          >
            <FaPlusSquare />
          </button>

          <BrandModal isOpen={isModalOpen} onClose={handleCloseModal}>
            <AddBrandsForm
              editingBrand={editingBrand}
              onClose={handleCloseModal}
            />
          </BrandModal>

          {isViewModalOpen && viewBrand && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Brand Details</h2>
                <img
                  src={viewBrand.logo}
                  alt={viewBrand.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <p className="text-lg">
                  <strong>Name:</strong> {viewBrand.name}
                </p>
                <p className="text-lg">
                  <strong>Description:</strong> {viewBrand.description}
                </p>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Table displaying filtered brand list */}
          <table className="table-auto bg-white border border-gray-300 w-full max-w-4xl">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border px-4 py-2">Logo</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrandList.map((brand) => (
                <tr key={brand.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="border px-4 py-2">{brand.name}</td>
                  <td className="border px-4 py-2">{brand.description}</td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        className="text-green-600 text-2xl hover:scale-110"
                        onClick={() => handleViewBrand(brand)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="text-blue-600 text-2xl hover:scale-110"
                        onClick={() => {
                          setEditingBrand(brand);
                          handleOpenModal();
                        }}
                      >
                        <RiEdit2Fill />
                      </button>
                      <button
                        className="text-red-600 text-2xl hover:scale-110"
                        onClick={() => handleDeleteBrand(brand.id)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Brands;
