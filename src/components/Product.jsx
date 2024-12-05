import React from 'react'
import Header from './Header'
import { P_IM2, P_IMG, P_IMG1 } from '../utils/Constant';
import { FaPlusSquare } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const Product = () => {
  const productList = [
    {
      id: '1',
      pName: 'Gentle Cleansing Gel',
      bName: 'Dr. Hauschka',
      description: 'A plant-based gel cleanser that removes impurities while nourishing the skin with natural oils.',
      pImg : P_IMG1,
      category: 'Facial Cleansers',
      price: '140.11',
    },
    {
      id: '2',
      pName: 'Rose Day Cream',
      bName: 'Dr. Hauschka',
      description: 'Infused with rose oil, this cream provides intense hydration and protection for sensitive skin.',
      pImg : P_IMG,
      category: 'Moisturizers',
      price: '170.22',
    },
    {
      id: '3',
      pName: 'Organic Coconut Body Oil',
      bName: 'Frank Body',
      description: 'Infused with rose oil, this cream provides intense hydration and protection for sensitive skin.',
      pImg : P_IM2,
      category: 'Exfoliators',
      price: '142.30',
    },
  ];
   const thStyle = 'border border-gray-300 px-4 py-2';
   const tdStyle = "border border-gray-300 px-4 py-2" ;

  return (
    
    <div>
      <div><Header/></div>

      <div className=' md:mt-7 mt-2 flex flex-col items-center justify-center'>
        <div className='flex '>
        <h2 className='text-2xl font-bold text-blue-900 hover:scale-95 duration-200
         '>All Products List</h2>
        </div>

        <div className='relative'>
        <button className='absolute -top-8 right-0  text-4xl text-orange-600'><FaPlusSquare /></button>
          {/* Table */}
          <table className="table-auto bg-white border md:my-4 border-gray-300 w-full max-w-4xl">
            <thead>
              <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-4 py-2">Id

              </th>
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
              {/* Map over the products array */}
              {productList.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 duration-200 text-sm"
                >
                  <td className={tdStyle}>{product.id}</td>
                  <td className={tdStyle}>
                    <img className='md:w-[200px]  border-gray-300 rounded-lg cursor-pointer
                     hover:scale-110 duration-150' src={product.pImg} alt='Product-img' /></td>
                  <td className={tdStyle}>{product.pName}</td>
                  <td className={tdStyle}>{product.bName}</td>
                  <td className={tdStyle}>{product.description}</td>
                  <td className={tdStyle}>{product.category}</td>
                  <td className={tdStyle}>${product.price}</td>
                  <td className={tdStyle}> 
                 <span className='flex space-x-2'>
                 <button className='text-green-600  text-2xl
                  font-semibold shadow-sm p-1 rounded-lg hover:scale-110 duration-200'><FaEye />
                  </button>
                  <button className='text-blue-600  text-2xl
                  font-semibold shadow-sm p-1 rounded-lg hover:scale-110 duration-200'><RiEdit2Fill />
                  </button>
                  <button className='text-red-600 text-2xl
                  font-semibold shadow-sm p-1 rounded-lg hover:scale-110 duration-200'><MdDelete />
                  </button>
                 </span>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div></div>
    </div>
  )
}

export default Product
