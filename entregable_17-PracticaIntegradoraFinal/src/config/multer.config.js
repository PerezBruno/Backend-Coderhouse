import multer from "multer";
import { __dirname } from "../path.js";
import path from "path";

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         let uploadPath = '';

//         if (file.fieldname === 'profileImage') {
//             uploadPath = path.join(__dirname, 'uploads/profiles');
//         } else if (file.fieldname === 'productImage') {
//             uploadPath = path.join(__dirname, 'uploads/products');
//         } else if (file.fieldname === 'document') {
//             uploadPath = path.join(__dirname, 'uploads/documents');
//         }

//         cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//         const fileName = `${Date.now()}-${file.originalname}`;
//         cb(null, fileName);
//     },
// });

// const upload = multer({ storage });

//export default upload;

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "src/public/img");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}${Date.now()}`);
//   },
// });

// const upload = multer({ storage });

// export default upload;



 const  storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        console.log(`${__dirname}`+"/public/img")

        cb(null, __dirname+ "/public/img")
    },
    filename:(req, file,cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


export default storage;
