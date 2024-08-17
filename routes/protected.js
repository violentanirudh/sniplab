const express = require('express')
const router = express.Router()

const { renderPublish, handlePublish } = require('../controllers/protected')

router.route('/publish')
    .get(renderPublish)
    .post(handlePublish)


module.exports = router