const express = require("express");
const auth = require("../middleware/auth.middleware");
const { createRecipe, getAllRecipes, getRecipeById } = require("../controllers/recipe.controller");
const router = express.Router();

router.post("/", auth, createRecipe);
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);

module.exports = router;