const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    org_filename: {
        type: String,
        required: true,
    },
    downloads: {
        type: Number,
        default: 1,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    password: {
        type: String,
        default: null,
    },
    creation_date: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Link", linkSchema);
