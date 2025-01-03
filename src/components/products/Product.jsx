import React, { useState, useEffect } from "react";
import Header from "../Header";
import { ref, onValue, remove } from "firebase/database";
import { database } from "../../utils/firebase";
import { FaPlusSquare } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Modal from "./Modal";
import AddProductForm from "./AddProductForm";

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState([]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Fetch product data from Firebase Realtime Database
  useEffect(() => {
    const productRef = ref(database, "products");
    const unsubscribe = onValue(productRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const products = Object.entries(data).map(([id, product]) => ({
          id,
          ...product,
        }));
        setProductList(products);
        setFilteredProductList(products); // Initially show all products
      } else {
        setProductList([]);
        setFilteredProductList([]);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Brand Association
  useEffect(() => {
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
    });
  }, []);

  // Handle search query change
  const handleSearch = (query) => {
    setSearchTerm(query);
    const filteredProducts = productList.filter(
      (product) =>
        product.productName.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProductList(filteredProducts); // Update the filtered product list
  };

  // Handle View product
  const handleViewProduct = (product) => {
    setViewProduct(product);
    setIsViewModalOpen(true);
  };

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      const productRef = ref(database, `products/${id}`);
      await remove(productRef);
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  const thStyle = "border border-gray-300 px-4 py-2";
  const tdStyle = "border border-gray-300 px-4 py-2";

  return (
    <div>
      <Header onSearch={handleSearch} />

      <div className="md:mt-7 mt-2 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-blue-900 hover:scale-95 duration-200">
          All Products List
        </h2>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <AddProductForm
            onClose={() => {
              setEditingProduct(null); // Reset editing state on close
              handleCloseModal();
            }}
            editingProduct={editingProduct}
            brands={brands} // Pass brands as a prop
          />
        </Modal>

        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
        >
          {viewProduct && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                {viewProduct.productName}
              </h2>
              <img
                src={viewProduct.imageUrl}
                alt={viewProduct.productName}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p>
                <strong>Brand:</strong> {viewProduct.brand}
              </p>
              <p>
                <strong>Category:</strong> {viewProduct.category}
              </p>
              <p>
                <strong>Description:</strong> {viewProduct.description}
              </p>
              <p>
                <strong>Price:</strong> ${viewProduct.price}
              </p>
            </div>
          )}
        </Modal>

        {/* Add Product Button */}
        <div className="relative">
          <button
            onClick={handleOpenModal}
            className="absolute -top-8 hover:scale-90 right-0 text-4xl text-orange-600"
          >
            <FaPlusSquare />
          </button>

          {/* Table */}
          <table className="table-auto bg-white border md:my-4 border-gray-300 w-full max-w-4xl">
            <thead>
              <tr className="bg-gray-100 text-left">
                {/* <th className={thStyle}>Id</th> */}
                <th className={thStyle}>Image</th>
                <th className={thStyle}>Name</th>
                <th className={thStyle}>Brand</th>
                <th className={thStyle}>Description</th>
                <th className={thStyle}>Category</th>
                <th className={thStyle}>Price</th>
                <th className={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductList.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 duration-200 text-sm"
                >
                  {/* <td className={tdStyle}>{product.id}</td> */}
                  <td className={tdStyle}>
                    <img
                      className="md:w-[200px] border-gray-300 rounded-lg cursor-pointer hover:scale-110 duration-150"
                      src={product.imageUrl}
                      alt="Product-img"
                    />
                  </td>
                  <td className={tdStyle}>{product.productName}</td>
                  <td className={tdStyle}>{product.brand}</td>
                  <td className={tdStyle}>{product.description}</td>
                  <td className={tdStyle}>{product.category}</td>
                  <td className={tdStyle}>${product.price}</td>
                  <td className={tdStyle}>
                    <span className="flex space-x-2">
                      <button
                        onClick={() => handleViewProduct(product)}
                        className="text-green-600 text-2xl font-semibold shadow-sm p-1 rounded-lg hover:scale-110 duration-200"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          handleOpenModal();
                        }}
                        className="text-blue-600 text-2xl font-semibold shadow-sm p-1 rounded-lg hover:scale-110 duration-200"
                      >
                        <RiEdit2Fill />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 text-2xl font-semibold shadow-sm p-1 rounded-lg hover:scale-110 duration-200"
                      >
                        <MdDelete />
                      </button>
                    </span>
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

export default Product;
