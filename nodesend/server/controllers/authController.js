const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

exports.authenticateUser = async (req, res, next) => {
    // Show error messages
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract request data
    const { email, password } = req.body;

    // Verify user exists

    let user = await User.findOne({ email });
    if (!user) {
        res.status(400).json({ msg: "User does not exist." });
        return next();
    }

    // Verify password
    if (bcrypt.compareSync(password, user.password)) {
        // Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_CODE,
            {
                expiresIn: "8h",
            }
        );

        res.json({ token });
    } else {
        res.status(400).json({ msg: "Password is incorrect." });
        return next();
    }
};

exports.authenticatedUser = async (req, res) => {
    res.json({ user: req.user });
};
