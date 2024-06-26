const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

const instructionSchema = new mongoose.Schema({
  stepNumber: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const RatingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  ratedBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  commentedBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [ingredientSchema],
    instructions: [instructionSchema],
    prepTimeInMinutes: {
      type: Number, // in minutes
      required: true,
    },
    cookTimeInMinutes: {
      type: Number, // in minutes
      required: true,
    },
    numberOfServings: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Drink"],
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    createdBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    ratings: {
      type: [RatingSchema],
      default: [],
      required: true,
    },
    comments: {
      type: [commentSchema],
      default: [],
      required: true,
    },
  },
  { timestamps: { createdAt: "Date_Created", updatedAt: "Date_Updated" } }
);

module.exports = mongoose.model("Recipe", recipeSchema);
