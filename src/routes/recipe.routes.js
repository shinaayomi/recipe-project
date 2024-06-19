const express = require("express");
const auth = require("../middleware/auth.middleware");
const { createRecipe, getAllRecipes, getRecipeById, updateRecipeById, deleteRecipeById } = require("../controllers/recipe.controller");
const router = express.Router();

router.post("/", auth, createRecipe);
router.get("/", auth, getAllRecipes);
router.get("/:recipeId", auth, getRecipeById);
router.put("/:recipeId", auth, updateRecipeById);
router.delete("/:recipeId", auth, deleteRecipeById)

module.exports = router;