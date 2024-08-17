const express = require('express')
const router = express.Router()

const { renderPublish, renderPublished, handlePublish } = require('../controllers/protected')

router.route('/publish')
    .get(renderPublish)
    .post(handlePublish)

router.route('/published')
    .get(renderPublished)


module.exports = router