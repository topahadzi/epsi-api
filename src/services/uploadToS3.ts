import { S3 } from "aws-sdk";
import fs  from 'fs';

import config from "../config/config";

export const uploadToS3 = async (s3: S3, fileData?: Express.Multer.File) => {
  try {
    const fileContent = fs.readFileSync(fileData!.path);

    const params = {
      Bucket: config.bucket_name,
      Key: fileData!.originalname,
      Body: fileContent
    };
    
    try {
      const res = await s3.upload(params).promise();

      console.log("File Uploaded with Successfull", res.Key);

      return {success: true, message: "File Uploaded with Successfull", data: res.Key};
    } catch (error) {
      return {success: false, message: "Unable to Upload the file", data: error};
    }
  } catch (error) {
    return {success:false, message: "Unable to access this file", data: {}};
  }
}