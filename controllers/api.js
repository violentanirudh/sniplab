const Snips = require('../models/snips')
const length = 10

const handleGet = async (req, res) => {

    if (req.query.page && (isNaN(req.query.page))) return res.status(404).json({ status: 'error', data: 'No Data Found' })

    const page = parseInt(req.query.page) || 0

    const query = { verified: true }

    // If `user` is provided, include it in the query
    if ('user' in req.query) {
        query.user = req.query.user || req.user.id
    }

    try {
        const snips = await Snips.find(
            query,
            { uid: 1, slug: 1, heading: 1, language: 1, description: 1, fullname: 1, clicks: 1, user: 1, createdAt: 1 },
            { skip: length * page, limit: length }
        )

        if (snips.length === 0) return res.status(404).json({ status: 'error', data: 'No Data Found' })

        const json = {
            snips,
            more: snips.length === length
        }

        return res.json({ status: 'success', data: json })
    } catch (error) {
        return res.status(400).json({ status: 'error', data: 'Bad Request' })
    }
}

const handleDelete = async (req, res) => {
    const { uid, slug } = req.params

    if (!req.user) return res.status(401).json({ status: 'error', data: 'Unauthorized' })

    const snip = await Snips.deleteOne({ uid, slug, user: req.user.id })
    
    if (snip) return res.status(200).json({ status: 'success', data: "Deleted" })
        
    return res.status(400).json({ status: 'error', data: 'Bad Request' })
}

module.exports = {
    handleGet, handleDelete
}