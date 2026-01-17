const multer = require('multer');
const path = require('path');
const fs = require('fs');

// define file directory
const uploadDir = path.join(__dirname, '../uploads');

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// configuration of the storage and filename for multer to handle
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})


// resume file type filter
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /pdf|doc|docx/;
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedFileTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, DOC, DOCX files allowed"));
    }
};

// multer upload instance
const uploadResume = multer({
    storage,
    fileFilter,
    limits: { fileSize : 5 * 1024 * 1024}
});

module.exports = uploadResume;