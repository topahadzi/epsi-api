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
exports.BeritaClass = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config/config"));
const aws_sdk_1 = require("aws-sdk");
const uploadToS3_1 = require("../services/uploadToS3");
const requireDir = require('require-dir');
requireDir('../models');
const Berita = mongoose_1.default.model("Berita");
class BeritaClass {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                console.log(req.file);
                if (req.file) {
                    const s3 = new aws_sdk_1.S3({
                        accessKeyId: config_1.default.aws_access_key_id,
                        secretAccessKey: config_1.default.aws_secret_access_key,
                    });
                    console.log("file stobject", req.file);
                    const uploadRes = yield (0, uploadToS3_1.uploadToS3)(s3, req.file);
                    const createBerita = yield Berita.create(req.body);
                    const updateBerita = yield Berita.findByIdAndUpdate(createBerita.id, {
                        photo: "https://d1x1dyl0o67nta.cloudfront.net/" + String(uploadRes.data)
                    });
                    return res.status(200).json({ msg: `Success Create Berita`, berita: updateBerita });
                }
                else {
                    const createBerita = yield Berita.create(req.body);
                    return res.status(200).json({ msg: `Success Create Berita`, berita: createBerita });
                }
            }
            catch (e) {
                return res.status(400).json({ msg: `error create berita`, error: e });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const berita = yield Berita.findById(req.params.id);
                if (!berita) {
                    return res.status(400).json({ msg: "berita tidak Ada" });
                }
                if (req.file) {
                    const s3 = new aws_sdk_1.S3({
                        accessKeyId: config_1.default.aws_access_key_id,
                        secretAccessKey: config_1.default.aws_secret_access_key,
                    });
                    console.log("file stobject", req.file);
                    const uploadRes = yield (0, uploadToS3_1.uploadToS3)(s3, req.file);
                    yield Berita.findByIdAndUpdate(req.params.id, {
                        photo: "https://d1x1dyl0o67nta.cloudfront.net/" + String(uploadRes.data)
                    });
                }
                const update = yield Berita.findByIdAndUpdate(req.params.id, req.body);
                return res.status(200).json({ msg: `Success Update`, berita: update });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ msg: `Update Berita Failed`, error: e });
            }
        });
    }
    getBeritaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const berita = yield Berita.findById(req.params.id).populate("createdby", "name");
                return res.status(200).json({ msg: `Get Berita`, berita: berita });
            }
            catch (e) {
                return res.status(400).json({ msg: `Get Berita By Id Failed`, error: e });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const berita = yield Berita.find().sort({ createdAt: -1 });
                ;
                return res.status(200).json({ msg: `Get All Berita`, berita: berita });
            }
            catch (e) {
                return res.status(400).json({ msg: `Get Berita All Failed`, error: e });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const berita = yield Berita.deleteOne({ _id: req.params.id });
                return res.status(200).json({ msg: `Delete Berita Success`, berita: berita });
            }
            catch (e) {
                return res.status(400).json({ msg: `Delete Berita Failed`, error: e });
            }
        });
    }
}
exports.BeritaClass = BeritaClass;
//# sourceMappingURL=Berita.controller.js.map