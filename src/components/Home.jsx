import React from 'react'
import Login from './Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Products from './Products'

const Home = () => {
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path: '/product',
            element: <Products/>
        },
   ] )
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Home
