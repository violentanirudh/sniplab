const express = require('express')
const router = express.Router()

const { renderAccount, renderPublish, renderPublished, handlePublish, handleEdit, renderEdit } = require('../controllers/protected')

router.route('/account')
    .get(renderAccount)

router.route('/publish')
    .get(renderPublish)
    .post(handlePublish)

router.route('/edit/:uid/:slug')
    .get(renderEdit)
    .post(handleEdit)

router.route('/published')
    .get(renderPublished)


module.exports = router