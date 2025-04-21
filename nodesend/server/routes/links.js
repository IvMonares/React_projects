const express = require("express");
const router = express.Router();
const linkController = require("../controllers/linkController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
    "/",
    [
        check("org_filename", "The original filename is required")
            .not()
            .isEmpty(),
    ],
    auth,
    linkController.newLink
);

router.get("/", linkController.getAllLinks);

router.get("/:url", linkController.getLink);
router.post("/:url", linkController.verifyPassword);

module.exports = router;
