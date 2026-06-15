import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import {v2 as cloudinary} from "cloudinary";
import {config} from "../../config.js"

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloud_api_key,
    api_secret: config.cloudinary.cloud_api_secret
});

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"Hospital_Rosales",
        allowed_formats: ["jpg", "png", "jpeg"]
    }
})

const upload = multer({storage})

export default upload;