import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from '../utils/userSlice';
import { CiSearch } from "react-icons/ci";

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // State to track login status
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

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
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);  // Pass the search term to parent component
  };

  // Toggle Page
  const handleTogglePage = () => {
    if (location.pathname === "/product") {
      navigate("/brand"); // Navigate to the Brands page
    } else {
      navigate("/product"); // Navigate to the Product page
    }
  };

  return (
    <div className="flex justify-between items-center p-4 shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center">
        <img
          className="cursor-pointer rounded-full h-[30px] w-[30px] md:w-[50px] md:h-[50px]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRis5-f_HdX16whAjiZJrd-qmN-zinc3aQ0Cw&s"
          alt="logo"
        />
      </div>

      {/* Navigation and Search Section */}
      <div className="flex items-center space-x-4">
        {/* Toggle Page Button */}
        {isUserLoggedIn && (
          <button
            onClick={handleTogglePage}
            className="md:mr-3 cursor-pointer hover:scale-95 px-4 py-2 rounded-xl bg-black text-white text-sm md:text-md"
          >
            {location.pathname === "/product" ? "See Brands" : "See Products"}
          </button>
        )}

        {/* Search Bar */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              className="outline-none px-4 py-2 border border-gray-400 rounded-full w-32 sm:w-48 md:w-64"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange} // Update search term
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-200 rounded-full">
              <CiSearch size={"24px"} />
            </button>
          </div>
        </div>

        {/* User Section (Log Out & Profile) */}
        {isUserLoggedIn && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-slate-200 cursor-pointer px-3 py-2 rounded-full hover:bg-slate-300 hover:scale-95 duration-200">
              <img
                className="w-[30px] h-[30px] rounded-full"
                alt="userIcon"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              />
              <button
                onClick={handleSignOut}
                className="font-semibold text-sm ml-2"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
