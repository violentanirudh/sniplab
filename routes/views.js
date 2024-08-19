const express = require('express')
const router = express.Router()
const { renderHome, renderSignIn, renderUser, renderSignUp, renderArticles } = require('../controllers/views')

router.get('/', renderHome)
router.get('/r/:id', renderUser)
router.get('/@/:username', renderUser)
router.get('/page/:page', renderHome)
router.get('/:uid/:slug', renderArticles)
router.get('/signin', renderSignIn)
router.get('/signup', renderSignUp)

module.exports = router