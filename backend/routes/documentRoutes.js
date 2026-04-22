const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require('path');
const { uploadDocument, getDocuments } = require("../controllers/documentController");

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Route to handle downloads
router.get("/download/:filename", (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, "../uploads", fileName);

    res.download(filePath, (err) => {
        if (err) {
            res.status(404).send({ message: "Could not download file" });
        }
    });
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadDocument);
router.get("/", getDocuments);

module.exports = router;