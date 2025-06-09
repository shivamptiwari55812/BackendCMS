import dotenv from "dotenv"
dotenv.config();

import {v2 as cloudinary} from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary"
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "others";
    let resource_type = "auto";

    if (file.fieldname === "projectImg") {
      folder = "images";
      resource_type = "image";
    } else if (file.fieldname === "videoProject") {
      folder = "videos";
      resource_type = "video";
    } else if (file.fieldname === "projectCode") {
      folder = "pdfs";
      resource_type = "raw"; // for PDF and other non-media
    }

    return {
      folder,
      resource_type,
    };
  },
});

export { cloudinary, storage };


