import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addUser, removeUser} from '../utils/userSlice'

const Header = () => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // State to track login status
  const dispatch = useDispatch()

  // Handle user logout
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        setIsUserLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        // Handle error
        console.error("Error signing out:", error);
        navigate("/error");
      });
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in        
        const {uid, email, displayName } = user;
        dispatch(addUser({uid:uid, email:email, displayName:displayName}))
        setIsUserLoggedIn(true);
      } else {
        // User is signed out        
        dispatch(removeUser());
        setIsUserLoggedIn(false);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-between shadow-lg">
      <div className="flex">
        <img
          className="m-2 cursor-pointer rounded-full h-[30px] w-[30px] md:w-[50px] md:h-[50px]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRis5-f_HdX16whAjiZJrd-qmN-zinc3aQ0Cw&s"
          alt="logo"
        />
      </div>
      <div>{/* Add other header elements here */}</div>
      {/* Show user icon and Log Out button only if the user is logged in */}
      {isUserLoggedIn && (
        <div className="flex shadow-xl items-center bg-slate-200
         cursor-pointer m-1 hover:bg-slate-300 hover:scale-90 duration-200 rounded-full">
          <img
            className="w-[30px] h-[30px] my-2 mx-2 rounded-2xl"
            alt="userIcon"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          />
          <button
            onClick={handleSignOut}
            className="font-semibold text-sm rounded-lg space-x-1 mr-2"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
