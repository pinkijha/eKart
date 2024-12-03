import React, { useState } from 'react'

const Login = () => {
  const [ isSignIn, setIsSignIn ] = useState();

  // Toggle SignIn / SignUp Button
  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  }

  const handleButtonClick = () => {

  }

  return (
    <div className=' '>
      <form className='md:space-y-4 space-x-2 rounded-xl shadow-lg bg-slate-300 md:w-3/12 my-36 mx-auto p-12'>         
      <h1 className='font-bold text-2xl'>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>    
      
      {isSignIn ? '' : <input type='text' placeholder='Name' className='mt-2 w-full py-3 px-7
             rounded bg-black text-white border border-grayText focus:border-white' />}

        <input type='email' placeholder='Email address' className='mt-2 w-full py-3 px-7
             rounded bg-black text-white border border-grayText focus:border-white' />

        <input type='password' placeholder='Password' className='w-full py-3 px-7 
            rounded bg-black text-white border border-grayText  focus:border-white' />

        <button onClick={handleButtonClick} className='bg-red-600
            font-medium text-white w-full py-3 px-7 rounded'>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
            <span className='mr-1 '>{isSignIn ? 'New to Ekart? ' : 'Already have Account '}</span>
            <button type='button' onClick={toggleSignInForm} className='font-semibold text-blue-600'>{isSignIn ? 'Sign Up Now' : 'Sign In'}</button>
            

            
      </form>
    </div>
  )
}

export default Login
