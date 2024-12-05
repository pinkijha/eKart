import React from 'react'
import Header from './Header'
import { P_IM2, P_IMG, P_IMG1 } from '../utils/Constant'

const Product = () => {
  const productList = [
    {
      id: '1',
      pName: 'Gentle Cleansing Gel',
      bName: 'Dr. Hauschka',
      description: 'A plant-based gel cleanser that removes impurities while nourishing the skin with natural oils.',
      pImg : P_IMG1,
      category: 'Facial Cleansers',
      price: '400.00 RS.',
    },
    {
      id: '2',
      pName: 'Rose Day Cream',
      bName: 'Dr. Hauschka',
      description: 'Infused with rose oil, this cream provides intense hydration and protection for sensitive skin.',
      pImg : P_IMG,
      category: 'Moisturizers',
      price: '700.00 RS.',
    },
    {
      id: '3',
      pName: 'Organic Coconut Body Oil',
      bName: 'Frank Body',
      description: 'Infused with rose oil, this cream provides intense hydration and protection for sensitive skin.',
      pImg : P_IM2,
      category: 'Exfoliators',
      price: '500.00 RS.',
    },
  ]

  return (
    
    <div>
      <div><Header/></div>

      <div className=' md:mt-6 mt-2 flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-bold text-blue-900 hover:scale-95 duration-200
         '>All Products List</h2>
        <div>
          {/* Table */}
          <table className="table-auto bg-white border md:my-4 border-gray-300 w-full max-w-4xl">
            <thead>
              <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 px-4 py-2">Id</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Brand</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                
              </tr>
            </thead>
            <tbody>
              {/* Map over the products array */}
              {productList.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 duration-200 text-sm"
                >
                  <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.pName}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.bName}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img className='md:w-[200px]  border-gray-300 rounded-lg cursor-pointer
                     hover:scale-150 duration-150' src={product.pImg} alt='Product-img' /></td>
                  <td className="border border-gray-300 px-4 py-2">{product.category}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                  <td className="border border-gray-300 px-4 py-2"> 
                  <button className='bg-green-600 text-white 
                  font-semibold shadow-sm p-2 rounded-lg hover:scale-110 duration-200'>View
                  </button></td>
                 
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
