const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        return callback(null, './images')
    },
    filename: function (req, file, callback) {
        const extension = path.extname(file.originalname).toLowerCase()
        return callback(null, `${ Date.now() }-${ crypto.randomBytes(12).toString('hex') + extension }`)
    }
})

const fileFilter = (req, file, callback) => {

    const allowedExtensions = ['.jpg', '.png', '.gif', '.jpeg']
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

    const extension = path.extname(file.originalname).toLowerCase()

    if (allowedExtensions.includes(extension) && allowedMimeTypes.includes(file.mimetype))
        return callback(null, true)
    return callback(null, false)

}

const uploader = multer({
    storage, fileFilter, limits : { fileSize: 4 * 1024 * 1024 }
})

module.exports = uploader