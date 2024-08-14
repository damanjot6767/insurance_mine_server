import multer from "multer";
import path from "path";

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/uploads/"));
    },

    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const multerUpload = multer({storage:multerStorage});

export { multerUpload};