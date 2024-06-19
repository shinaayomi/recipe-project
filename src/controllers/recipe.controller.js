const Recipe = require("../model/recipe.model");
const logger = require("../utils/logger");

const createRecipe = async (req, res, next) => {
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
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
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
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

module.exports = {
    createRecipe
}