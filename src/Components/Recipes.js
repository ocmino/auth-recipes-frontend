import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
/*import styles from "./Recipes.module.css";*/

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      axios
        .get("http://localhost:8080/api/v1/recipes/getAllRecipes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setRecipes(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  //store the recipeName and send it to the recipe page
  const handleClick = (recipeName) => {
    localStorage.setItem("recipeName", recipeName);
  };

return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <br />
      <br />
      <h1 className="text-6xl font-bold">Recipes</h1>
      <br />
      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        <div className="grid grid-cols-3 gap-16">
          {recipes.map((recipe) => (
            <div
              className="bg-white rounded-lg shadow-md p-6"
              key={recipe.recipeId}
            >
              <h2 className="text-2xl font-bold">{recipe.recipeName}</h2>
              <p className="mt-3 text-xl">Prep Time: {recipe.prepTime} minutes</p>
              <p className="mt-3 text-xl">Cook Time: {recipe.cookTime} minutes</p>
              <p className="mt-3 text-xl">Servings: {recipe.servings}</p>
              <br />
              <Link
                to="/recipe"
                onClick={() => handleClick(recipe.recipeName)}
                className="px-4 py-2 mt-4 text-base font-semibold text-white transition duration-200 ease-in bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                View Recipe
              </Link>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <Link
        to="/dashboard"
        className="px-4 py-2 mt-4 text-base font-semibold text-white transition duration-200 ease-in bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Back
      </Link>
    </div>
    <br />
    <br />
  </div>
);
}

export default Recipes;

