const { check, validationResult } = require("express-validator");

const validateLogin = [
    check('name')
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 4 }).withMessage("Name must be atleast 4 characters long!"),
    check('password')
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long!"),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                status: "error",
                error: "Validation Failed",
                details: errors.array()
            });
        }
        next();
    }
]

module.exports = {
    validateLogin
};