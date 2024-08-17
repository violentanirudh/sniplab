const express = require('express')
const { handleSignIn, handleSignUp, handleSignOut } = require('../controllers/auth')
const router = express.Router()

router.get('/signout', handleSignOut)

router.post('/signup', handleSignUp)
router.post('/signin', handleSignIn)

module.exports = router