const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Files will be stored in the "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Multer File Filter
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    }
    return cb(new Error("Only images (jpg, jpeg, png) or PDFs are allowed!"), false);
};

const upload = multer({ storage, fileFilter });

module.exports = { upload }; // ✅ Correct export