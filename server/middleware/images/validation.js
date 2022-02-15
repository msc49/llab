module.exports = (req, res, next) => {

  // if (typeof req.file === "undefined" || typeof req.body === "undefined") {
  //   return res.status(400).json({
  //     errors: "Problem with sending data",
  //   });
  // }


// let { path } = req.file
// console.log('PATH', path)

// if (
//   !req.file.mimetype.includes("jpeg") &&
//   !req.file.mimetype.includes("jpg") &&
//   !req.file.mimetype.includes("png")
// ) { 
//   return res.status(400).json({
//     errors: "file not supported"
//   })
// }

// if(req.file.size > 1024 * 1024) {
//   return res.status(400).json({
//     errors: "File is Too large"
//   })
// }

// if(!path) {
//   return res.status(400).json({
//     errors: "file path is required"
//   })
// }

next()

};

