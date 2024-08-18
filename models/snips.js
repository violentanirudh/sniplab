const mongoose = require('mongoose')

const fileScheme = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    verified: {
        type: Boolean,
        default: false,
    },
    clicks: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

const Snips = mongoose.model('snip', fileScheme)

module.exports = Snips