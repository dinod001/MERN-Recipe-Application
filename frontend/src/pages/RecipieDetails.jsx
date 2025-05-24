import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  //handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/recipies/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Deletion can't be completed");
    }
  };

  if (!recipie) return <div>Loading....</div>;
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg mt-5">
      {recipie.photoUrl && (
        <img
          src={recipie.photoUrl}
          alt={recipie.title}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
      )}
      <h1 className="capitalize text-3xl font-bold mb-4">{recipie.title}</h1>
      <p className="text-gray-600 mb-4 ">Category: {recipie.category}</p>
      <p className="text-gray-600 mb-4 ">
        Cooking Time: {recipie.cookingTime} minutes
      </p>
      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="pl-6 mb-4 list-disc">
        {recipie.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <p className="text-gray-700 mb-4">{recipie.instructions}</p>
      {user && user._id === recipie.createdBy && (
        <>
          <button>Update</button>
          <button onClick={() => handleDelete(id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default RecipieDetails;
