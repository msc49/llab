const multer = require('multer')
const { storage } = require('./cloudinary')
// const upload = multer({ storage })

// set storage 2

// // set storage
// const storage = multer.diskStorage({
//   destination: function(req, res, cb) {
//     cb(null, './uploads/')
//   },
//   filename: function(req, file, cb) {
//     // generate unique name for each image
//     cb(null, 'llab' + '-' + Date.now()+path.extname(file.originalname))
//   }
// })

//  file filter
const filterFilter = (req, file, cb) => {
  cb(null, true)
}

let upload = multer({
  storage: storage,
  fileFilter: filterFilter,
})

module.exports = upload.single('itemImage')