const Recipe = require("../model/recipe.model");
const logger = require("../utils/logger");

const restrictToOwner = async (req, res, next) => {
    try {
        const { recipeId } = request.params;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({
                status: "error",
                message: `Recipe with ID: ${recipeId} does not exist.`
            })
        }

        if (recipe.createdBy.toString() !== req.user._id) {
            return res.status(403).json({
                status: "error",
                message: "Forbidden! You are not authorized to update this recipe"
            });

        };
        
        next();
    } catch (error) {
        logger.error(error.message);
    }
};

module.exports = restrictToOwner;