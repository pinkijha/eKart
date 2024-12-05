import React, { useEffect } from 'react'
import Login from './Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux';
import {addUser, removeUser} from '../utils/userSlice'
import Product from './Product'

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
