const express = require("express");
const { uploadToIPFS } = require("../config/pinata");
const { upload } = require("../config/multer");
const path = require("path");

const router = express.Router();

router.post("/ipfs", upload.single("file"), async (req, res) => {

    // * 1. check if file type if valid 
    if (!req.file) {
        return res.status(400).json({ 
            error: "No file uploaded or invalid file type" 
        });
    }

    // * 2 Get the full path of the file
    const fullPath = path.join(
        process.cwd(), // ? Gets the current path, where this file is present
        `${req.file.destination}${req.file.filename}`
    );

    console.log(`File was uploaded successfully it's in ${fullPath}`);
    
    // * 3 Upload to ipfs and generate the link
    const ipfsLink = await uploadToIPFS(fullPath, req.file);

    console.log(upload);
    console.log("Link of the item : " + ipfsLink);

    res.json({ 
        message: `File uploaded successfully to ipsc ${ipfsLink}`, 
        link: ipfsLink,
        file: req.file 
    });

});

module.exports = router;