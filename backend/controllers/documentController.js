const Document = require("../models/Document");

// Upload a new document
exports.uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const newDoc = new Document({
    name: req.file.originalname,
    type: req.file.originalname.split('.').pop(),
    path: req.file.path,
    date: new Date().toLocaleDateString() 
});

const savedDoc = await newDoc.save();
res.status(201).json(savedDoc); 
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get all documents
exports.getDocuments = async (req, res) => {
    try {
        const docs = await Document.find().sort({ createdAt: -1 }); // Newest first
        res.json(docs);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};