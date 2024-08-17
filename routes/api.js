const express = require('express')
const { handleGet } = require('../controllers/api')
const router = express.Router()

router.route('/snips')
    .get(handleGet)

module.exports = router