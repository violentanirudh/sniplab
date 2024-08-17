const Files = require('../models/files')


const renderHome = async (req, res) => {
    const length = 10

    if (req.params.page && (isNaN(req.params.page) || req.params.page === '0')) {
        return res.status(404).redirect('/')
    }

    const page = parseInt(req.params.page) || 0

    const files = await Files.find(
        { verified: true },
        { uid: 1, slug: 1, heading: 1, language: 1, description: 1, fullname: 1, createdAt: 1 },
        { skip: length * page, limit: length }
    )

    if (files.length === 0) return res.status(404).redirect('/')

    const validPages = {
        previous: page > 0,
        next: files.length === length ? true : null,
        page
    }

    return res.render('home', { files, validPages });
};


const renderArticles = async (req, res) => {
    const { uid, slug } = req.params
    const article = await Files.findOneAndUpdate({ uid, slug }, { $inc: { clicks: 1 }}, { new: true })
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