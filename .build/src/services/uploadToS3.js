"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToS3 = void 0;
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config/config"));
const uploadToS3 = (s3, fileData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileContent = fs_1.default.readFileSync(fileData.path);
        const extension = fileData.mimetype.split('/')[1];
        console.log(extension);
        const params = {
            Bucket: config_1.default.bucket_name,
            Key: Date.now() + "." + extension,
            Body: fileContent
        };
        try {
            const res = yield s3.upload(params).promise();
            console.log("File Uploaded with Successfull", res.Key);
            return { success: true, message: "File Uploaded with Successfull", data: res.Key };
        }
        catch (error) {
            return { success: false, message: "Unable to Upload the file", data: error };
        }
    }
    catch (error) {
        return { success: false, message: "Unable to access this file", data: {} };
    }
});
exports.uploadToS3 = uploadToS3;
//# sourceMappingURL=uploadToS3.js.map