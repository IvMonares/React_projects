const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Get Authorization
    const authHeader = req.get("Authorization");

    if (authHeader) {
        // Get token
        const token = authHeader.split(" ")[1];

        try {
            // Verify token
            const user = jwt.verify(token, process.env.JWT_CODE);
            req.user = user;
        } catch (error) {
            res.status(400).json({ msg: "Token is invalid." });
        }
    }
    return next();
};
