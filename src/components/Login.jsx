import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/Validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false); // For success or error messages
  const navigate = useNavigate();

  // create reference value to all input fields using useRef hooks
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // Toggle SignIn / SignUp Button
  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  // Hnadle onClick button
  const handleButtonClick = () => {
    // Validate The Form data
    const message = checkValidData(
      name,
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    setIsSuccess(false); // Reset success state for validation errors

    if (message) return;

    // signIn / Signup logic
    if (!isSignIn) {
      // SignUp Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          
        // After successful signup, switch to Sign In mode
        setIsSuccess(true); // Mark as success
        setErrorMessage("Sign Up successful! Please log in.");
        setIsSignIn(true); // Toggle to Sign In form
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setIsSuccess(false); // Mark as error
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      // SignIn Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
           navigate("product");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setIsSuccess(false); // Mark as error
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  return (
    <div className=" ">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="md:space-y-4 space-y-2 rounded-xl shadow-lg
         bg-slate-300 md:w-3/12 w-[300px] my-36 mx-auto p-12"
      >
        <h1 className="font-bold text-2xl">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {isSignIn ? (
          ""
        ) : (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="mt-2 w-full py-3 px-7
             rounded bg-black text-white border border-grayText focus:border-white"
          />
        )}

        <input
          ref={email}
          type="email"
          placeholder="Email address"
          className="mt-2 w-full py-3 px-7
             rounded bg-black text-white border border-grayText focus:border-white"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full py-3 px-7 
            rounded bg-black text-white border border-grayText  focus:border-white"
        />
         {/* Success/Error message */}
      <p className={isSuccess ? "text-green-600 " : "text-red-500"}>
        {errorMessage}
      </p>

        <button
          onClick={handleButtonClick}
          className="bg-red-600
            font-medium text-white w-full py-3 px-7 rounded"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <span className="mr-1 ">
          {isSignIn ? "New to Ekart? " : "Already have Account "}
        </span>
        <button
          type="button"
          onClick={toggleSignInForm}
          className="font-semibold text-blue-600"
        >
          {isSignIn ? "Sign Up Now" : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
