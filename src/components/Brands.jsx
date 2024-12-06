import React from 'react'
import Header from './Header'
import { B_IM2, B_IMG, B_IMG1 } from '../utils/Constant';
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";

const Brands = ({}) => {
  const brands = [
    {
      id: 1,
      name:'Just Herbs',
      description:'Just Herbs is a brand that believes in simplicity and transparency. Their organic skincare products feature Ayurvedic formulations with certified organic',
      logo: B_IMG1,
    }, 
    {
      id: 2,
      name:'Mamaearth',
      description:'Mamaearth is a popular brand for all the people who care about quality and harmless skincare products. ',
      logo: B_IMG,
    },
    {
      id: 3,
      name:'Tata Harper',
      description:'Tata Harper is all about optimisation on product, with a natural conscience underpinning the brand. ',
      logo: B_IM2,
    },
  ]

  const thStyle = "border border-gray-300 px-4 py-2";
  const tdStyle = "border border-gray-300 px-4 py-2"; 
  return (
    <div>
      <Header    />
      <div className='md:mt-7 mt-2 flex flex-col items-center justify-center'>
        <h2 className="text-2xl font-bold text-blue-900 hover:scale-95 duration-200">Brands List</h2>
      

      <div className='relative'>
      <button
           
            className="absolute -top-8 hover:scale-90 right-0 text-4xl text-orange-600"
          >
            <FaPlusSquare />
          </button>
        <table className="table-auto bg-white border md:my-4 border-gray-300 w-full max-w-4xl">
        <thead>
            <tr className="bg-gray-200 text-left">
              <th className={thStyle}>Logo</th>
              <th className={thStyle}>Name</th>
              <th className={thStyle}>Description</th>
              <th className={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {brands.map((brand, index) => (
              <tr
                key={index}
              >
                <td className={tdStyle}>
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="md:w-[200px] border-gray-300 rounded-lg cursor-pointer hover:scale-110 duration-150"
                  />
                </td>
                <td className={tdStyle}>{brand.name}</td>
                <td className={tdStyle}>{brand.description}</td>
                <td className={tdStyle}>
                  <span className="flex space-x-2">

                  <button className="text-blue-600 text-2xl font-semibold shadow-sm p-1 rounded-lg hover:scale-110 duration-200">
                  <FaEye /> 
                  </button>

                  <button className="text-green-600 text-2xl font-semibold shadow-sm p-1 rounded-lg hover:scale-110 duration-200"
                  >
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
  )
}

export default Brands
