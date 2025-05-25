import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RecipieDetails = () => {
  const [recipie, setRecipie] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipies = async () => {
      const res = await axios.get(`/api/recipies/${id}`);
      setRecipie(res.data);
    };
    fetchRecipies();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/recipies/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Deletion can't be completed");
    }
  };

  if (!recipie)
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-8">
      {recipie.photoUrl && (
        <img
          src={recipie.photoUrl}
          alt={recipie.title}
          className="w-full h-96 object-cover rounded-xl mb-6"
        />
      )}

      <h1 className="capitalize text-3xl font-bold text-gray-800 mb-4">
        {recipie.title}
      </h1>

      <div className="text-gray-600 mb-4 space-y-1">
        <p>
          <span className="font-medium">Category:</span> {recipie.category}
        </p>
        <p>
          <span className="font-medium">Cooking Time:</span>{" "}
          {recipie.cookingTime} minutes
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Ingredients
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {recipie.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Instructions
        </h2>
        <p className="text-gray-700 leading-relaxed">{recipie.instructions}</p>
      </div>

      {user && user._id === recipie.createdBy && (
        <div className="flex flex-wrap gap-4 mt-6">
          <Link to={`/edit-recipie/${id}`}>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
              Update
            </button>
          </Link>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipieDetails;
