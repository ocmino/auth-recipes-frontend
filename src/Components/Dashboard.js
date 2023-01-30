import React, { useState, useEffect, Navigate} from "react";

export default function Dashboard() {
  
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  //logout function that removes the token from local storage and navigates to the login page
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  //check for 403 error and navigate to login page
  const checkError = (err) => {
    if (err.response.status === 403) {
      logout();
    } else {
      setError(err);
    }
  };
  
    
  
  
return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-8xl font-bold">Welcome to your very own recipes application!</h1>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <div className="w-full p-6 mt-6 text-left border rounded-xl sm:w-1/2">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={() => (window.location.href = "/recipes")}
            >
              Recipes
            </button>
            <br />
            <br />
            <button
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

