const fs = require('fs')

module.exports = (req, res, next) => {
  // first we will save item name and image
  // valid req.body or req.file not get undefined
  if (typeof req.file === "undefined" || typeof req.body === "undefined") {
    // if error
    return res.status(400).json({
      errors: "Problem with sending data",
    });
  }

// get name and image
let { title } = req.body
let { path } = req.file

// check type of image we will accept only png/jpg/jpeg
if (
  !req.file.mimetype.includes("jpeg") &&
  !req.file.mimetype.includes("jpg") &&
  !req.file.mimetype.includes("png")
) {
  // first remove file
  fs.unlinkSync(path)
  return res.status(400).json({
    errors: "file not supported"
  })
}

// check file size is max 1mb
if(req.file.size > 1024 * 1024) {
  // first remove file
  fs.unlinkSync(path)
  return res.status(400).json({
    errors: "File is Too large"
  })
}

// check for empty field
if(!title || !path) {
  return res.status(400).json({
    errors: "all fields are required"
  })
}

next()

};

