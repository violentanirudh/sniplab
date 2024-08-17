const jwt = require('jsonwebtoken')
const jwtSecret = 'SimpleForNow'

const generateToken = async (data) => {
    return jwt.sign(data, jwtSecret)
}

const validateToken = async (token) => {
    try {
        return jwt.verify(token, jwtSecret)
    } catch (error) {
        return false
    }
}

function createSlug(text) {
    return text
        .toString()                   // Convert to string
        .toLowerCase()                // Convert to lowercase
        .trim()                       // Remove whitespace from both ends
        .replace(/\s+/g, '-')         // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '')     // Remove all non-word characters except hyphens
        .replace(/\-\-+/g, '-')       // Replace multiple hyphens with a single hyphen
        .replace(/^-+/, '')           // Remove leading hyphens
        .replace(/-+$/, '');          // Remove trailing hyphens
}


module.exports = {
    generateToken, validateToken, createSlug
}