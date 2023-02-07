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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config/config"));
const aws_sdk_1 = require("aws-sdk");
const uploadToS3_1 = require("../services/uploadToS3");
const requireDir = require('require-dir');
requireDir('../models');
const Posyandu = mongoose_1.default.model("Posyandu");
const User = mongoose_1.default.model("User");
exports.default = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.file) {
                    const s3 = new aws_sdk_1.S3({
                        accessKeyId: config_1.default.aws_access_key_id,
                        secretAccessKey: config_1.default.aws_secret_access_key,
                    });
                    console.log("file stobject", req.file);
                    const uploadRes = yield (0, uploadToS3_1.uploadToS3)(s3, req.file);
                    const createPosyandu = yield Posyandu.create(req.body);
                    const updatePosyandu = yield Posyandu.findByIdAndUpdate(createPosyandu.id, {
                        photo: "https://d1x1dyl0o67nta.cloudfront.net/" + String(uploadRes.data)
                    });
                    return res.status(200).json({ msg: `Success Create Posyandu`, posyandu: updatePosyandu });
                }
                else {
                    const createPosyandu = yield Posyandu.create(req.body);
                    return res.status(200).json({ msg: `Success Create Posyandu`, posyandu: createPosyandu });
                }
            }
            catch (e) {
                return res.status(400).json({ msg: `error create posyandu`, error: e });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posyandu = yield Posyandu.findById(req.params.id);
                if (!posyandu) {
                    return res.status(400).json({ msg: "Posyandu tidak Ada" });
                }
                if (req.file) {
                    const s3 = new aws_sdk_1.S3({
                        accessKeyId: config_1.default.aws_access_key_id,
                        secretAccessKey: config_1.default.aws_secret_access_key,
                    });
                    console.log("file stobject", req.file);
                    const uploadRes = yield (0, uploadToS3_1.uploadToS3)(s3, req.file);
                    yield Posyandu.findByIdAndUpdate(req.params.id, {
                        photo: "https://d1x1dyl0o67nta.cloudfront.net/" + String(uploadRes.data)
                    });
                }
                const updateposyandu = yield Posyandu.findByIdAndUpdate(req.params.id, req.body);
                return res.status(200).json({ msg: `Success Update`, posyandu: updateposyandu });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ msg: `Update Posyandu Failed`, error: e });
            }
        });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posyandu = yield Posyandu.find();
                return res.status(200).json({ msg: `Get Posyandu`, posyandu: posyandu });
            }
            catch (e) {
                return res.status(400).json({ msg: `Get Posyandu Failed`, error: e });
            }
        });
    },
    getPosyanduById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posyandu = yield Posyandu.findById(req.params.id);
                return res.status(200).json({ msg: `Get Posyandu`, posyandu: posyandu });
            }
            catch (e) {
                return res.status(400).json({ msg: `Get Posyandu By Id Failed`, error: e });
            }
        });
    },
    getOrangtua(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posyandu = yield User.find({ posyandu: req.params.id, roles: "orangtua" }).populate("anak");
                ;
                return res.status(200).json({ msg: `Get list orang tua`, orangtua: posyandu });
            }
            catch (e) {
                return res.status(400).json({ msg: `Get list orang tua Failed`, error: e });
            }
        });
    },
    getKader(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posyandu = yield User.find({ posyandu: req.params.id, roles: "kader" });
                ;
                return res.status(200).json({ msg: `Get list kader`, kader: posyandu });
            }
            catch (e) {
                return res.status(400).json({ msg: `Get list kader Failed`, error: e });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posyandu = yield Posyandu.deleteOne({ _id: req.params.id });
                return res.status(200).json({ msg: `Delete Posyandu Success`, posyandu: posyandu });
            }
            catch (e) {
                return res.status(400).json({ msg: `Delete Posyandu Failed`, error: e });
            }
        });
    }
};
//# sourceMappingURL=Posyandu.controller.js.map