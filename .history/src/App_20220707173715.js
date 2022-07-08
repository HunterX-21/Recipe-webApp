import "./App.css";
import { useEffect, useState } from "react";
import Recipe from "./Recipes";
import React from "react";
const App = () => {
  const APP_ID = "6b1c144c";
  const APP_KEY = "458cc45743dd5428f00b4794732fbd3e";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setquery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setquery(search);
    setSearch("");
  };

  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const body = document.body;
    const toggle = document.querySelector(".toggle-inner");

    // If dark mode is enabled - adds classes to update dark-mode styling.
    // Else, removes and styling is as normal.
    if (darkMode === true) {
      body.classList.add("dark-mode");
      toggle.classList.add("toggle-active");
    } else {
      body.classList.remove("dark-mode");
      toggle.classList.remove("toggle-active");
    }
  }, [darkMode]);

  return (
    <div className="body">
      <header></header>

      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
