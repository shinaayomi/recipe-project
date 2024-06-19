const express = require("express");
const auth = require("../middleware/auth.middleware");
const { createRecipe, getAllRecipes, getRecipeById, updateRecipeById } = require("../controllers/recipe.controller");
const router = express.Router();

router.post("/", auth, createRecipe);
router.get("/", auth, getAllRecipes);
router.get("/:recipeId", auth, getRecipeById);
router.put("/:recipeId", updateRecipeById);

module.exports = router;