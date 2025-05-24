import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [recipies, setRecipies] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchRecipies = async () => {
      const res = await axios.get(
        `/api/recipies${
          category && category !== "All" ? `?category=${category}` : ""
        }`
      );
      setRecipies(res.data.recipies);
    };
    fetchRecipies();
  }, [category]);

  const categories = [
    "All",
    "Breakfirst",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
  ];
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-wrap gap-2 mt-2">
        {categories.map((cat) => (
          <button
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              category === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            key={cat}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipies.map((recipie, index) => (
          <Link
            to={`/recipie/${recipie._id}`}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg duration-300 cursor-pointer"
            key={recipie._id}
          >
            {recipie.photoUrl && (
              <img
                src={recipie.photoUrl}
                alt={recipie.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-sembold capitalize">
                {recipie.title}
              </h2>
              <p className="text-gray-600">{recipie.category}</p>
              <p className="text-gray-600">{recipie.cookingTime} minutes</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
