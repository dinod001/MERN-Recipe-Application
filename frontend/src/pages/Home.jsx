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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-3  mb-8">
          {categories.map((cat) => (
            <button
              onClick={() => setCategory(cat)}
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                category === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipies.map((recipie) => (
            <Link
              to={`/recipie/${recipie._id}`}
              key={recipie._id}
              className="bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition duration-300 overflow-hidden"
            >
              {recipie.photoUrl ? (
                <img
                  src={recipie.photoUrl}
                  alt={recipie.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 capitalize truncate">
                  {recipie.title}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Category:</span>{" "}
                  {recipie.category}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Cooking Time:</span>{" "}
                  {recipie.cookingTime} mins
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
