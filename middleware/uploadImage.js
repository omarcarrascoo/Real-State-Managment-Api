const multer =require("multer")

const uploadFile = () => {
    const storage = multer.diskStorage({
        destination: 'public/files/imgs',
        filename: function (_req, file, cb){
            var extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
            cb(null, Date.now() + extension);
        }
    })
    const upload = multer({storage : storage}).single('file');
    console.log(upload)
    return upload;
}

module.exports = uploadFile;