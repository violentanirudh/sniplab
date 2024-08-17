const fs = require('fs')
const path = require('path')
const { createSlug } = require('../utils/helpers')
const { randomBytes } = require('crypto')
const Files = require('../models/files')

const renderPublish = (req, res) => {
    res.render('publish', { flash: req.flash('flash') })
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
        await Files.create(data)
        req.flash('flash', { type: 'success', text: 'Snippet Will Be Published After Verification.' })
    } catch (error) {
        req.flash('flash', { type: 'error', text: 'Error saving your data. Please try again.' })
    }

    return res.redirect('/publish')

}

module.exports = {
    renderPublish, handlePublish
}