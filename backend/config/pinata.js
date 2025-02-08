const PinataSDK = require("pinata-web3").PinataSDK;
const fs = require("fs");
const { Blob } = require("buffer");

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: "example-gateway.mypinata.cloud",
});

/**
 * 
 * ? @param pathToFile this takes path of file and uploads
 * ? it to the ipfs
 * 
 * * @returns the link to the ipfs file
 */
async function uploadToIPFS(pathToFile, uploadedFile) {
    const blob = new Blob([fs.readFileSync(pathToFile)]);
    const file = new File([blob], uploadedFile.filename, { type: uploadedFile.mimetype})
    const upload = await pinata.upload.file(file);
    const link = `https://ipfs.io/ipfs/${upload.IpfsHash}`;

    console.log(upload);

    console.log("Link of the item : " + link);

    return link;
}

module.exports = { uploadToIPFS };