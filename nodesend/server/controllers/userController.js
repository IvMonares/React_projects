const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.newUser = async (req, res) => {
    // Show error messages
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract request data
    const { email, password } = req.body;

    // Verify user does not exist
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ msg: "User already exists." });
    }

    // Create new user
    user = new User(req.body);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    try {
        // Save user
        await user.save();
        res.json({ msg: "User created successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "The user could not be created." });
    }
};
