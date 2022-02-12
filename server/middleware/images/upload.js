const multer = require('multer')
const { storage } = require('./cloudinary')

// file filter - is this necessary?
const filterFilter = (req, file, cb) => {
  cb(null, true)
}

let upload = multer({
  storage: storage,
  fileFilter: filterFilter,
})

// should we change this to allow multiple image uploads
module.exports = upload.single('itemImage')