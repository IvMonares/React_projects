const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");
const auth = require("../middleware/auth");

router.post("/", auth, fileController.uploadFile);
router.get(
    "/:filename",
    fileController.downloadFile,
    fileController.deleteFile
);

module.exports = router;
