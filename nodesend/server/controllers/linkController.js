const Link = require("../models/Link");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const { validationResult } = require("express-validator");

exports.newLink = async (req, res) => {
    // Show error messages
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract request data - TODO remove?
    const { org_filename, filename } = req.body;

    // Create new link
    const link = new Link();
    link.url = shortid.generate();
    link.filename = filename;
    link.org_filename = org_filename;

    // If user is authenticated
    if (req.user) {
        const { password, downloads } = req.body;

        if (password) {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            link.password = await bcrypt.hash(password, salt);
        }
        if (downloads) {
            link.downloads = downloads;
        }

        link.author = req.user.id;
    }

    try {
        // Save link
        await link.save();
        res.json({ msg: link.url });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "The link could not be created." });
    }
};

exports.getAllLinks = async (req, res, next) => {
    const links = await Link.find({}).select("url -_id");
    res.json(links);
};

exports.getLink = async (req, res, next) => {
    // Get url
    const { url } = req.params;

    // Verify url exists
    const link = await Link.findOne({ url });
    if (!link) {
        res.status(400).json({ msg: "The desired link no longer exists." });
        return next();
    }

    res.json({
        url: link.url,
        filename: link.filename,
        org_filename: link.org_filename,
        hasPassword: link.password != null,
    });
};

exports.verifyPassword = async (req, res, next) => {
    // Get variables
    const { url } = req.params;
    const { password } = req.body;

    // Verify url exists
    const link = await Link.findOne({ url });
    if (!link) {
        res.status(400).json({ msg: "The desired link no longer exists." });
        return next();
    }

    if (bcrypt.compareSync(password, link.password)) {
        res.json({
            validated: true,
        });
        next();
    } else {
        res.status(401).json({ msg: "Wrong password." });
    }
};
