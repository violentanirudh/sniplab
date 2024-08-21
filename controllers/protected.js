const { createSlug } = require('../utils/helpers')
const { randomBytes } = require('crypto')
const sharp = require('sharp')
const Snips = require('../models/snips')

const renderAccount = async (req, res) => {
    res.render('account', { flash: req.flash('flash') })
}

const renderPublish = (req, res) => {
    res.render('publish', { flash: req.flash('flash') })
}

const renderEdit = async (req, res) => {
    const { uid, slug } = req.params
    const article = await Snips.findOne({ uid, slug, user: req.user.id })
    if (!article)
        return res.status(404).redirect('/')
    return res.render('edit', { article, flash: req.flash('flash') })
}

const renderPublished = async (req, res) => {
    res.render('published')
}

const handleEdit = async (req, res) => {
    const languages = ['html', 'css', 'javascript', 'python', 'sql', 'react']
    const { heading, language, snippet, description } = req.body
    const { uid, slug } = req.params

    if (!uid || !slug)
        return res.redirect('/')

    if (!heading || heading.trim().length < 10) {
        req.flash('flash', { type: 'info', text: 'Invalid Heading. Minimum 10 Characters.' })
        return res.redirect('/publish')
    }

    if (!language || !languages.includes(language)) {
        req.flash('flash', { type: 'info', text: 'Invalid Language. Please Select Valid Ones.' })
        return res.redirect('/publish')
    }

    if (!description || description.trim().length < 100 || description.length > 4000) {
        req.flash('flash', { type: 'info', text: 'Invalid Snippet. Minimum 100 Characters.' })
        return res.redirect('/publish')
    }

    if (!snippet || snippet.trim().length < 100 || snippet.length > 40000) {
        req.flash('flash', { type: 'info', text: 'Invalid Snippet. Minimum 100 Characters.' })
        return res.redirect('/publish')
    }

    const query = {
        uid, slug, user: req.user.id
    }

    const data = {
        heading, 
        language,
        description, 
        snippet: JSON.stringify(snippet), 
    }

    try {
        await Snips.findOneAndUpdate(query, { $set: data}, {new: true})
        req.flash('flash', { type: 'success', text: 'Published Your Changes.' })
    } catch (error) {
        req.flash('flash', { type: 'error', text: 'Error saving your data. Please try again.' })
    }

    return res.redirect(req.path)

}

const handleAccount = async (req, res) => {
    if (req.file) {
        const filepath = req.file.path;
        try {
            const file = await sharp(filepath)
                .resize({ width: 500 })
                .toFormat('jpeg')
                .toFile(filepath.replace(/(\.[\w\d_-]+)$/i, '-compressed.jpg'))
            console.log(file);
        } catch (error) {
            console.log('Error compressing the file.', error)
        }
    }
    return res.send('hello')
}

const handlePublish = async (req, res) => {

    const languages = ['html', 'css', 'javascript', 'python', 'sql', 'react']
    const { heading, language, snippet, description } = req.body

    if (!heading || heading.trim().length < 10) {
        req.flash('flash', { type: 'info', text: 'Invalid Heading. Minimum 10 Characters.' })
        return res.redirect('/publish')
    }

    if (!language || !languages.includes(language)) {
        req.flash('flash', { type: 'info', text: 'Invalid Language. Please Select Valid Ones.' })
        return res.redirect('/publish')
    }

    if (!description || description.trim().length < 100 || description.length > 4000) {
        req.flash('flash', { type: 'info', text: 'Invalid Snippet. Minimum 100 Characters.' })
        return res.redirect('/publish')
    }

    if (!snippet || snippet.trim().length < 100 || snippet.length > 40000) {
        req.flash('flash', { type: 'info', text: 'Invalid Snippet. Minimum 100 Characters.' })
        return res.redirect('/publish')
    }

    const uid = randomBytes(3).toString('hex')
    const slug = createSlug(heading)

    const data = {
        uid, 
        slug, 
        heading, 
        language,
        description, 
        snippet: JSON.stringify(snippet), 
        fullname: req.user.fullname,
        user: req.user.id, 
    }

    try {
        await Snips.create(data)
        req.flash('flash', { type: 'success', text: 'Snippet Will Be Published After Verification.' })
    } catch (error) {
        req.flash('flash', { type: 'error', text: 'Error saving your data. Please try again.' })
    }

    return res.redirect('/publish')

}

module.exports = {
    renderAccount, renderPublish, renderEdit, renderPublished, handlePublish, handleEdit, handleAccount
}