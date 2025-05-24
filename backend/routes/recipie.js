import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    instructions: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    photo_url: {
      type: String,
      required: true,
    },
    cooking_time: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const recipie = mongoose.model("Recipie", recipeSchema);
export default recipie;
