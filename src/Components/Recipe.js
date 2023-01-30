import React, { useState, useEffect } from "react";
import axios from "axios";
/*import styles from "./Recipe.module.css";*/

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  //get the recipeName from the search
  const search = window.location.search;
  const params = new URLSearchParams(search);

  //get recipeName from local storage
  const recipeName = localStorage.getItem("recipeName");

  //get the recipe from the database
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      axios
        .get(
          `http://localhost:8080/api/v1/recipes/getRecipe?name=${recipeName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          //set recipe for recipeName, prepTime,cookTime, servings and instructions
          setRecipe(res.data.recipe);
          //set ingredients for ingredientName and quantity
          setIngredients(res.data.ingredients);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  /*return (
    <div className={styles.recipeContainer}>
        <div>
            <h1>{recipe.recipeName}</h1>
            <h3>Prep time: {recipe.prepTime} minutes</h3>
            <h3>Cook time: {recipe.cookTime} minutes</h3>
            <h3>Serves: {recipe.servings}</h3>
            <h2>Ingredients</h2>
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.ingredientId}>
                        {ingredient.ingredientName} - {ingredient.quantity}
                    </li>
                ))}
            </ul>
            <h2>Instructions</h2>
            <p>{recipe.instructions}</p>
        </div>

        <button
            onClick={() => {
                localStorage.removeItem("recipeName");
                window.location.href = "/recipes";
            }}
        >
            Back
        </button>
    </div>
);
};


export default Recipe;*/

//return using tailwind, make it look nice and EVEN
return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center"> 
      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        <div className="w-full p-6 mt-6 text-left border rounded-xl sm:w-1/2">
          <h1 className="text-4xl font-bold">{recipe.recipeName}</h1>
          <br />
          <h3 className="text-2xl font-bold">Prep time: {recipe.prepTime} minutes</h3>
          <h3 className="text-2xl font-bold">Cook time: {recipe.cookTime} minutes</h3>
          <h3 className="text-2xl font-bold">Serves: {recipe.servings}</h3>
          <br />
          <h2 className="text-3xl font-bold">Ingredients</h2>
          <ul>
            {ingredients.map((ingredient) => (
              <li key={ingredient.ingredientId}>
                {ingredient.ingredientName} - {ingredient.quantity}
              </li>
            ))}
          </ul>
          <br />
          <h2 className="text-3xl font-bold">Instructions</h2>
          <p>{recipe.instructions}</p>
        </div>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("recipeName");
          window.location.href = "/recipes";
        }
      }
      >
        Back
      </button>
    </div>
  </div>
);
};

export default Recipe;
