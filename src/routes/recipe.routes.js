const express = require("express");
const auth = require("../middleware/auth.middleware");
const { createRecipe } = require("../controllers/recipe.controller");
const router = express.Router();

router.post("/", auth, createRecipe);

module.exports = router;