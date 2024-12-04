import React, { useEffect } from 'react'
import Login from './Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Products from './Products'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux';
import {addUser, removeUser} from '../utils/userSlice'
import ProductDetail from './ProductDetail'

const Home = () => {
  const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path: '/product',
            element: <Products/>
        },
        {
            path: '/product/:productId',
            element: <ProductDetail/>
        },
   ] )

  //  useEffect(() =>{
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const {uid, email, displayName } = user;
  //       dispatch(addUser({uid:uid, email:email, displayName:displayName}))
  //     } else {
  //       dispatch(removeUser());
  //     }
  //   });

  //  },[])

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Home
