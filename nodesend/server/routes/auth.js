const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
    "/",
    [
        check("email", "The email is invalid").isEmail(),
        check(
            "password",
            "The password must have at least 6 charachters."
        ).isLength({ min: 6 }),
    ],
    authController.authenticateUser
);

router.get("/", auth, authController.authenticatedUser);

module.exports = router;
