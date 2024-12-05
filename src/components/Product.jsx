import React, { useState, useEffect } from 'react';
import Header from './Header';
import { ref, onValue } from 'firebase/database';
import {database} from '../utils/firebase';
import { FaPlusSquare } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Modal from './Modal';
import AddProductForm from './AddProductForm';

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productList, setProductList] = useState([]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Fetch product data from Firebase Realtime Database
  useEffect(() => {
    const productRef = ref(database, 'products');
    const unsubscribe = onValue(productRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const products = Object.entries(data).map(([id, product]) => ({
          id,
          ...product,
        }));
        setProductList(products);
      } else {
        setProductList([]);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const thStyle = 'border border-gray-300 px-4 py-2';
  const tdStyle = "border border-gray-300 px-4 py-2";

  return (
    <div>
      <Header />
      <div className="md:mt-7 mt-2 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-blue-900 hover:scale-95 duration-200">
          All Products List
        </h2>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <AddProductForm onClose={handleCloseModal} />
        </Modal>

        {/* Add Product Button */}
        <div className="relative">
          <button
            onClick={handleOpenModal}
            className="absolute -top-8 right-0 text-4xl text-orange-600"
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
              {productList.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 duration-200 text-sm">
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
                      <button className="text-green-600 text-2xl font-semibold shadow-sm p-1 rounded-lg hover:scale-110 duration-200">
                        <FaEye />
                      </button>
                      <button className="text-blue-600 text-2xl font-semibold shadow-sm p-1 rounded-lg hover:scale-110 duration-200">
                        <RiEdit2Fill />
                      </button>
                      <button className="text-red-600 text-2xl font-semibold shadow-sm p-1 rounded-lg hover:scale-110 duration-200">
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
