const express = require('express')
const uploader = require('../utils/uploader')
const router = express.Router()

const { renderAccount, renderPublish, renderPublished, renderEdit, handlePublish, handleEdit, handleAccount } = require('../controllers/protected')

router.route('/account')
    .get(renderAccount)
    .post(uploader.single('image') ,handleAccount)

router.route('/publish')
    .get(renderPublish)
    .post(handlePublish)

router.route('/edit/:uid/:slug')
    .get(renderEdit)
    .post(handleEdit)

router.route('/published')
    .get(renderPublished)


module.exports = router