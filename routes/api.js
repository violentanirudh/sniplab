const express = require('express')
const { handleGet, handleDelete } = require('../controllers/api')
const router = express.Router()

router.route('/:uid/:slug')
    .delete(handleDelete)

router.route('/snips')
    .get(handleGet)


module.exports = router