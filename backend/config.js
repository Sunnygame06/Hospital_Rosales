import dotenv from "dotenv"

dotenv.config();

export const config= {
    JWT:{
        secret: process.env.JWT_SECRET_KET
    },
    email:{
        user_email: process.env.USER_EMAIL,
        user_pass: process.env.USER_PASS
    },
    cloudinary:{
        cloud_name: process.env.CLOUD_NAME,
        cloud_api_key: process.env.CLOUD_API_KEY,
        cloud_api_secret: process.env.CLOUD_API_SECRET
    }
};