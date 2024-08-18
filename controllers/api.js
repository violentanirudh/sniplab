const Snips = require('../models/snips')
const length = 10

const handleGet = async (req, res) => {

    if (req.query.page && (isNaN(req.query.page))) return res.status(404).json({ status: 'error', data: 'No Data Found' })

    const page = parseInt(req.query.page) || 0

    const query = { }

    // If `userid` is provided, include it in the query
    if (req.query.user === '') {
        query.user = req.user.id
    }

    const snips = await Snips.find(
        query,
        { uid: 1, slug: 1, heading: 1, language: 1, description: 1, fullname: 1, clicks: 1, createdAt: 1 },
        { skip: length * page, limit: length }
    )

    if (snips.length === 0) return res.status(404).json({ status: 'error', data: 'No Data Found' })

    const json = {
        snips,
        more: snips.length === length
    }

    return res.json({ status: 'success', data: json })
}

module.exports = {
    handleGet
}