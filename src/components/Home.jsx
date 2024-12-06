import React, { useEffect } from 'react'
import Login from './Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux';
import {addUser, removeUser} from '../utils/userSlice'
import Product from './products/Product'
import Brands from './brands/Brands'

const Home = () => {
  
  const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path: '/product',
            element: <Product/>
        },,
        {
            path: '/brand',
            element: <Brands />
        },
        
   ] )

  

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Home
