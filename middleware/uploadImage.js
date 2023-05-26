const multer =require("multer")
const sharp = require('sharp');
const watermarkPath2 = 'http://localhost:8000/images/INDUSTRYLUX.jpg';

 
// const uploadFile = () => {
//     const storage = multer.diskStorage({
//         destination: 'public/images',
//         filename: function (_req, file, cb){
//             var extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
//             cb(null, Date.now() + extension);
//         }
//     })
//     const upload = multer({storage : storage}).single('file');
//     console.log(upload)
//     const fileName = multer.diskStorage({})
//     return upload;
// }
const uploadFile = () => {
    const storage = multer.diskStorage({
        destination: 'public/images',
        filename: function (_req, file, cb){
            var extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
            cb(null, Date.now() + extension);
        }
    });

    const upload = multer({ storage: storage }).single('file');

    const addWatermark = (file) => {
        const watermarkPath = watermarkPath2; // Ruta de la imagen de marca de agua

        sharp(file.path)
            .composite([{ input: watermarkPath }])
            .toFile(file.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
    };

    return (req, res, next) => {
        upload(req, res, (err) => {
            if (err) {
                // Manejar el error
                return;
            }

            if (req.file) {
                // Agregar la marca de agua a la imagen
                addWatermark(req.file);
            }

            next();
        });
    };
};
module.exports = uploadFile;