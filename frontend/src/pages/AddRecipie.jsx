import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipie = () => {
  const [formdata, setFormData] = useState({
    title: "",
    ingredients: [""],
    instructions: "",
    category: "",
    photoUrl: "",
    cookingTime: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  //handle inpit changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  //handle ingredient array
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formdata.ingredients];
    newIngredients[index] = value;
    handleInputChange("ingredients", newIngredients);
    const lastIngredient =
      formdata.ingredients[formdata.ingredients.length - 1];
    if (error && lastIngredient.trim() !== "") {
      setError("");
    }
  };

  //add ingredient
  const addIngredient = () => {
    const lastIngredient =
      formdata.ingredients[formdata.ingredients.length - 1];
    if (lastIngredient.trim() !== "") {
      setError("");
      handleInputChange("ingredients", [...formdata.ingredients, ""]);
    } else {
      setError("Please fill in the last ingredient before adding a new one");
    }
  };

  //remove ingredient
  const removeIngredient = (index) => {
    if (formdata.ingredients.length > 1) {
      const newIngredients = formdata.ingredients.filter((_, i) => i !== index);
      handleInputChange("ingredients", newIngredients);
      const lastIngredient =
        formdata.ingredients[formdata.ingredients.length - 1];
      if (error && lastIngredient.trim() !== "") {
        setError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("/api/recipies", {
        title: formdata.title,
        ingredients: formdata.ingredients.filter((i) => i.trim() !== ""),
        instructions: formdata.instructions,
        category: formdata.category,
        photoUrl: formdata.photoUrl,
        cookingTime: formdata.cookingTime
          ? Number(formdata.cookingTime)
          : undefined,
      });
      navigator("/");
    } catch (error) {
      setError("Failed to add recipie");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Add Recipie</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={formdata.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Ingredients</label>
          {formdata.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="w-full p-2 border rounded"
                placeholder={`Ingredients ${index + 1}`}
                required
              />
              {formdata.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={addIngredient}
          >
            Add Ingredient
          </button>
        </div>
        <div>
          <label className="block text-gray-700">Instructions</label>
          <textarea
            type="text"
            value={formdata.instructions}
            onChange={(e) => handleInputChange("instructions", e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Category</label>
          <select
            onChange={(e) => handleInputChange("category", e.target.value)}
            value={formdata.category}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Breakfirst">Breakfirst</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Cooking Time (minutes)</label>
          <input
            type="number"
            value={formdata.cookingTime}
            onChange={(e) => handleInputChange("cookingTime", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., 30"
            min={0}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Photo URL</label>
          <input
            type="text"
            value={formdata.photoUrl}
            onChange={(e) => handleInputChange("photoUrl", e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
          type="submit"
        >
          {loading ? "Adding ..." : "Add Recipie"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipie;
