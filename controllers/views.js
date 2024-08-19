const Snips = require('../models/snips')
const User = require('../models/users')

const renderHome = async (req, res) => {
    return res.render('home')
}

const renderUser = async (req, res) => {
    const query = {}
    console.log(req.params, req.path)
    if (req.path.includes('/@/')) {
        query.username = req.params.username
    } else {
        query._id = req.params.id
    }

    const user = await User.findOne(query)
    if (!user)
        return res.status(404).redirect('/')
    user.password = undefined
    return res.render('user', { user })
}

const renderArticles = async (req, res) => {
    const { uid, slug } = req.params
    const article = await Snips.findOneAndUpdate({ uid, slug }, { $inc: { clicks: 1 }}, { new: true })
    if (!article)
        return res.status(404).redirect('/')
    return res.render('articles', { article })
}

const renderSignIn = (req, res) => {
    if (req.user) return res.redirect('/')
    return res.render('signin', { flash: req.flash('flash') })
}

const renderSignUp = (req, res) => {
    if (req.user) return res.redirect('/')
    return res.render('signup', { flash: req.flash('flash') })
}

module.exports = {
    renderHome,
    renderArticles,
    renderSignIn,
    renderSignUp,
    renderUser
}