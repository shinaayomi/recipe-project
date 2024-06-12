const bcrypt = require("bcryptjs");
const validator = require("express-validator");
const User = require("../model/user.model");
const logger = require("../utils/logger");
const generateTokenAndSetCookie = require("../utils/generateToken");

// @desc register new user controller logic
const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // 1. Check if the email is unique
        const checkEmail = await User.findOne({ email });

        if (checkEmail) {
            return res.status(400).json({ status: "error", message: "Email already exist!" })
        };

        // 2. Create new user
        const hash = await bcrypt.hash(password, 10);

        const newUser = new User ({
            fullName,
            email,
            password: hash
        });

        await newUser.save();

        res.status(201).json({
            status: "success",
            message: "User registration successfull",
            data: {
                fullName: newUser.fullName,
                email: newUser.email
            }
        });

    } catch (error) {
        logger.error("Error Occured in signup controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc login user controller logic
const login = async (req, res) => {
    try {
        const { name, password } = req.body;

        const user = await User.findOne({ name });

        // check if password is correct with the one in DB
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ status: "error", error: "Invalid username or password" });
        };

        // generate token as cookie
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                _id: user._id,
                name: user.name,
            }
        });

    } catch (error) {
        logger.error("Error occured in login controller", error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
};

module.exports = {
    signup, login
};