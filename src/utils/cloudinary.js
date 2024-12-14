import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import { API_KEY, API_SECRET, CLOUD_NAME } from "../dbconfig/server.js";

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        ///upload the file on cloudinary
       const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been upload successfully
        console.log("File is uploaded on cloudinary");
        console.log(response.url);
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath) ///remove the locallysaved temporary file as the uploadoperation got failed
        return
    }
}

export {uploadOnCloudinary}

