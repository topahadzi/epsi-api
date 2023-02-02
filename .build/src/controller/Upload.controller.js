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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const aws_sdk_1 = require("aws-sdk");
const uploadToS3_1 = require("../services/uploadToS3");
const config_1 = __importDefault(require("../config/config"));
class UploadController {
}
exports.UploadController = UploadController;
_a = UploadController;
UploadController.Upload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const s3 = new aws_sdk_1.S3({
        accessKeyId: config_1.default.aws_access_key_id,
        secretAccessKey: config_1.default.aws_secret_access_key,
    });
    // get file data through req.file thank to multer 
    console.log("file stobject", req.file);
    const uplaodRes = yield (0, uploadToS3_1.uploadToS3)(s3, req.file);
    if (uplaodRes.success) {
        res.status(200).json(uplaodRes);
    }
    else {
        res.status(400).json(uplaodRes);
    }
});
//# sourceMappingURL=Upload.controller.js.map