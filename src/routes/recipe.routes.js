const express = require("express");
const auth = require("../middleware/auth.middleware");
const { createRecipe, getAllRecipes, getRecipeById } = require("../controllers/recipe.controller");
const router = express.Router();

router.post("/", auth, createRecipe);
router.get("/", auth, getAllRecipes);
router.get("/:id", auth, getRecipeById);

module.exports = router;