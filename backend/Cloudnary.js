const  Cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

Cloudinary.config({
cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
api_key:process.env.CLOUDINARY_API_KEY,
api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadCloudnary = async (localFilePath) => {
    try {
      if (!localFilePath) {
        throw new Error("File path is required for upload");
      }
      const response = await Cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
      console.log("File uploaded successfully");
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
      return response;
    } catch (error) {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
      console.error("Error during Cloudinary upload:", error);
      return null;
    }
  };
  

const deleteCloudnary = async (publicId) =>{
try {
Cloudinary.uploader.destroy(publicId);
console.log("File deleted successfully");
} catch (error) {
console.log("Error deleting file");
}
}

module.exports = {uploadCloudnary,deleteCloudnary};