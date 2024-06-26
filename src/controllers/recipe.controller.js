const Recipe = require("../model/recipe.model");
const logger = require("../utils/logger");

const createRecipe = async (req, res) => {
    try {
        // check to ensure the title is unique
        const { title } = req.body;

        const foundRecipe = await Recipe.findOne({ title });

        if (foundRecipe) {
            return res.status(409).json({ status: "error", message: `Recipe with title: ${title} already exists.` });
        }
        // create a recipe object
        const newRecipe = new Recipe({
            title,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            prepTimeInMinutes: req.body.prepTimeInMinutes,
            cookTimeInMinutes: req.body.cookTimeInMinutes,
            numberOfServings: req.body.numberOfServings,
            category: req.body.category,
            cuisine: req.body.cuisine,
            difficulty: req.body.difficulty,
            image: req.body.image,
            createdBy: req.user._id
        });

        // save to db
       const recipe =  await Recipe.create(newRecipe);

       // Return a 201 (created) response
       return res.status(201).json({
        status: "success",
        message: "Recipe created",
        data: recipe
       });
       
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

const getAllRecipes = async (req, res) => {
    try {
        const { category, difficulty, title, cookingTimeLow, cookingTimeHigh, minPrepTime, maxPrepTime, random, ingredients } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        };

        if (difficulty) {
            filter.difficulty = difficulty;
        };

        if (title) {
            filter.title = new RegExp(title, "i");
        };

        if (cookingTimeLow) {
            filter.cookTimeInMinutes = { $gte: +cookingTimeLow }
        };

        if (cookingTimeHigh) {
            filter.cookingTImeInMinutes = {...(filter.cookTimeInMinutes || {}), $lte: +cookingTimeHigh}
        };

        if (minPrepTime) {
            filter.prepTimeInMinutes = { $gte: +minPrepTime };
        };

        if (maxPrepTime) {
            filter.prepTimeInMinutes = {...(filter.prepTimeInMinutes || {}), $lte: +maxPrepTime}
        };

        if (ingredients) {
            const ingredientList = ingredients.split(",");
            filter["ingredients.name"] = { $all: ingredientList.map(ingredient => new RegExp(ingredient.trim(), "i")) };
        }

        if (random) {
            const count = await Recipe.countDocuments(filter);
            const randomIndex = Math.floor(Math.random() * count);
            const randomRecipe = await Recipe.findOne(filter).skip(randomIndex);
            return res.status(200).json({
                status: "success",
                message: "Fetched Random Recipe successfully",
                data: randomRecipe
            });
        }

        const recipes = await Recipe.find(filter);

        return res.status(200).json({ 
            status: "success", 
            message: "Fetched Recipes successfully",
            count: recipes.length,
            data: recipes 
        })
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    };
};

const getRecipeById = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({
                status: "error", 
                message: `Recipe with ID: ${recipeId} not found.`
            });
        };

        return res.status(200).json({
            status: "success",
            message: "Fetched recipe successfully",
            data: recipe
        })
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
};

const updateRecipeById = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, { new: true, runValidators: true });

        if (!updatedRecipe) {
            return res.status(404).json({
                status: "error",
                message: `Recipe with ID: ${recipeId} not found.`
            })
        };

        return res.status(200).json({
            status: "success", 
            data: updatedRecipe
        });

    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ status: "error", message:"Internal Server Error" })
    }
};

const deleteRecipeById = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const deleteRecipe = await Recipe.findByIdAndDelete(recipeId);

        if (!deleteRecipe) {
            return res.status(404).json({
                status: "error",
                message: `Recipe with ID: ${recipeId} not found`
            })
        };

        return res.status(200).json({
            status: "success",
            message: "Recipe deleted successfully"
        });

    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

module.exports = {
    createRecipe, getAllRecipes, getRecipeById, updateRecipeById, deleteRecipeById
}