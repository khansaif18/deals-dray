import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Set custom filename
    }
})

const upload = multer({ storage: storage })

export default upload