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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../validators/generateToken"));
const uploadToS3_1 = require("../services/uploadToS3");
const config_1 = __importDefault(require("../config/config"));
const aws_sdk_1 = require("aws-sdk");
// import { IUser } from '../models/User';
const requireDir = require('require-dir');
requireDir('../models');
const User = mongoose_1.default.model("User");
const Posyandu = mongoose_1.default.model("Posyandu");
exports.default = {
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.email || !req.body.password) {
                    return res
                        .status(400)
                        .json({ msg: "Please. Send your email and password" });
                }
                const user = yield User.findOne({ email: req.body.email });
                if (!(yield bcryptjs_1.default.compare(req.body.password, user.password))) {
                    return res.status(200).json({ msg: `error logon`, error: 'Cannot found logon' });
                }
                const token = generateToken_1.default.generateJwt({ id: user.id });
                if (user === null) {
                    return res.status(400).json({ msg: `error logon`, error: 'Cannot found logon' });
                }
                else {
                    return res.header('auth-token', token).status(200).json({ msg: `success logon`, user: user, access_token: token });
                }
            }
            catch (e) {
                return res.status(400).json({ msg: `error login`, error: e });
            }
        });
    },
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ email: req.body.email });
                if (user) {
                    return res.status(400).json({ msg: "User sudah Ada" });
                }
                if (req.body.roles != "orangtua" && req.body.roles != "kader") {
                    return res
                        .status(400)
                        .json({ msg: "Roles tidak ada" });
                }
                const newuser = new User({
                    name: req.body.name,
                    nik: req.body.nik,
                    password: req.body.password,
                    email: req.body.email,
                    roles: req.body.roles,
                });
                const createUser = yield newuser.save();
                const token = generateToken_1.default.generateJwt({ id: newuser.id });
                return res.header('auth-token', token).status(200).json({ msg: `Success Register`, user: createUser, access_token: token });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ msg: `Signup Failed`, error: e });
            }
        });
    },
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findById(req.params.id);
                if (!user) {
                    return res.status(400).json({ msg: "User tidak Ada" });
                }
                if (req.file) {
                    const s3 = new aws_sdk_1.S3({
                        accessKeyId: config_1.default.aws_access_key_id,
                        secretAccessKey: config_1.default.aws_secret_access_key,
                    });
                    console.log("file stobject", req.file);
                    const uploadRes = yield (0, uploadToS3_1.uploadToS3)(s3, req.file);
                    yield User.findByIdAndUpdate(req.params.id, {
                        photo: "https://d1x1dyl0o67nta.cloudfront.net/" + String(uploadRes.data)
                    });
                }
                const updateuser = yield User.findByIdAndUpdate(req.params.id, req.body);
                if (req.body.posyandu) {
                    yield Posyandu.findByIdAndUpdate(req.body.posyandu, {
                        $push: { user: req.params.id }
                    });
                }
                return res.status(200).json({ msg: `Success Update`, user: updateuser });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ msg: `Update User Failed`, error: e });
            }
        });
    },
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params.id);
                const user = yield User.findById(req.params.id).populate("anak").populate("posyandu");
                return res.status(200).json({ msg: `Get User`, User: user });
            }
            catch (e) {
                return res.status(400).json({ msg: `Get User By Id Failed`, error: e });
            }
        });
    }
    // async getAll(req: Request, res: Response) {
    //     try {
    //         const createUser = await (await User.find()).length
    //         return res.status(200).json({msg: `All Works`, SizeOfDataBase: `${createUser} Pessoas Cadastradas`})
    //     } catch (e) {
    //         return res.status(400).json({ msg: `All Failed`, error: e })
    //     }
    // }
};
//# sourceMappingURL=User.controller.js.map