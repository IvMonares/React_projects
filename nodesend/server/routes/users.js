const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");

router.post(
    "/",
    [
        check("username", "The username is required").not().isEmpty(),
        check("email", "The email is invalid").isEmail(),
        check(
            "password",
            "The password must have at least 6 charachters."
        ).isLength({ min: 6 }),
    ],
    userController.newUser
);

module.exports = router;
