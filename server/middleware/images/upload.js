const multer = require('multer')
const { storage } = require('./cloudinary')

let upload = multer({
  storage: storage,
})

module.exports = upload.single('itemImage')