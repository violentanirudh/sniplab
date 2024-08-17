const Snips = require('../models/snips')

const renderHome = async (req, res) => {
    return res.render('home')
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
    renderSignUp
}