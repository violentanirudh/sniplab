const validator = require('validator')
const User = require('../models/users')
const { generateToken} = require('../utils/helpers')


const handleSignUp = async (req, res) => {

    if (req.user) return res.redirect('/')

    const { fullname, email, password } = req.body
    let errors = false

    if (!fullname || !validator.matches(fullname, /^[a-zA-Z ]+$/) || fullname.length > 64) {
        errors = true
        req.flash('flash', { type: 'info', text: 'Invalid Full fullname.' })
    }

    if (!email || !validator.isEmail(email) || email.length > 64) {
        errors = true
        req.flash('flash', { type: 'info', text: 'Invalid Email Address.' })
    }

    if (!password || !validator.isStrongPassword(password) || password.length > 64) {
        errors = true
        req.flash('flash', { type: 'info', text: 'Invalid Password.' })
    }

    if (errors)
        return res.redirect('/signup')

    try {
        const user = await User.create({ fullname, email, password })
    } catch (error) {
        req.flash('flash', { type: 'error', text: 'Email Already In Use.'})
        return res.redirect('/signup')
    }

    req.flash('flash', { type: 'success', text: 'Please verify your email.'})
    return res.redirect('/signin')
}

const handleSignIn = async (req, res) => {

    if (req.user) return res.redirect('/')

    const { email, password } = req.body
    const user = await User.validate(email.toLowerCase(), password)
    if ( !user ) {
        req.flash('flash', { type: 'error', text: 'Invalid Credentials.'})
        return res.redirect('/signin')
    }

    const data = { 
        id: user._id,
        fullname: user.fullname, 
        email: user.email,
        image: user.image,
        role: user.role,
    }

    res.cookie('user', await generateToken(data))
    return res.redirect('/')
}

const handleSignOut = (req, res) => {
    res.clearCookie('user')
    res.redirect('/')
}

module.exports = {
    handleSignIn,
    handleSignUp,
    handleSignOut
}