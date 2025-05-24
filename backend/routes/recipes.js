import express from "express";
import Recipie from "../models/recipie.js";
import { protect } from "../middleware/auth.js";

const recipeRouter = express.Router();

//create new Recipe
recipeRouter.post("/", protect, async (req, res) => {
  const { title, ingredients, instructions, category, photoUrl, cookingTime } =
    req.body;
  try {
    if (
      !title ||
      !ingredients ||
      !instructions ||
      !category ||
      !photoUrl ||
      !cookingTime
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    } else {
      const recipie = await Recipie.create({
        title,
        ingredients,
        instructions,
        category,
        photoUrl,
        cookingTime,
        createdBy: req.user._id,
      });
      res.status(201).json({ message: "New Recipe Added", Recipie: recipie });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNEL SERVER ERROR", err: error });
  }
});

//update recipie
recipeRouter.put("/:id", protect, async (req, res) => {
  const id = req.params.id;
  const { title, ingredients, instructions, category, photoUrl, cookingTime } =
    req.body;
  try {
    const recipe = await Recipie.findById(id);
    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients || recipie.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.category = category || recipe.category;
    recipe.photoUrl = photoUrl || recipie.photoUrl;
    recipe.cookingTime = cookingTime || recipe.cookingTime;
    const updatedRecipie = await recipe.save();
    res
      .status(200)
      .json({ message: "Updated the Recipie", UpdatedRecipie: updatedRecipie });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNEL SERVER ERROR", err: error });
  }
});

//get recipie
recipeRouter.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    const query = category ? { category } : {};
    const recipies = await Recipie.find(query);
    res.status(200).json({ recipies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNEL SERVER ERROR", err: error });
  }
});

//delete recipie
recipeRouter.delete("/:id", protect, async (req, res) => {
  const id = req.params.id;
  try {
    const recipie = await Recipie.findById({ id });
    if (recipie.createdBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Not Authorized" });
    }
    await Recipie.findByIdAndDelete(id);
    res.json("deleted Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNEL SERVER ERROR", err: error });
  }
});

export default recipeRouter;
