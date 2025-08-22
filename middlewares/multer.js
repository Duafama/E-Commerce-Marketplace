const multer= require('multer')
// const path= require('path')
const { CloudinaryStorage }= require('multer-storage-cloudinary')
const cloudinary = require("../config/cloudinaryCon");

 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'e-com-market',
    formats: ["jpg", "png", "jpeg"], // if more than one formats, use "formats" not "format"
    public_id: (req, file) => {
      const publicId = `${file.fieldname}-${Date.now()}`  //string + values
      return publicId
    }
  },
});

const upload = multer({ storage: storage })

module.exports= upload


//multer setup with diskstorage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // cb(null,  'E:/Node js/E-Com_Market/uploads'); // no absolute path baji
//       cb(null, path.join(__dirname, "../uploads/") )  //__dirname gives the absolute directory path of this file and then uploads folder will be check relative to the current directory. 
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, uniqueSuffix + '-' + path.extname(file.originalname) ) //path.extname gets the extension of the img like .jpg
//   }
// })