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
const requireDir = require('require-dir');
requireDir('../models');
const Posyandu = mongoose_1.default.model("Posyandu");
exports.default = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newposyandu = new Posyandu({
                    name: req.body.name,
                    alamat: req.body.alamat,
                    gambar: req.body.gambar,
                });
                const posyandu = yield Posyandu.findOne({ name: req.body.name });
                console.log(posyandu);
                if (posyandu) {
                    return res.status(400).json({ msg: "Posyandu Sudah Ada" });
                }
                const createPosyandu = yield newposyandu.save();
                return res.status(200).json({ msg: `Success Posyandu`, posyandu: createPosyandu });
            }
            catch (e) {
                return res.status(400).json({ msg: `error create posyandu`, error: e });
            }
        });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posyandu = yield Posyandu.find().populate("user");
                ;
                return res.status(200).json({ msg: `Get Posyandu`, Posyandu: posyandu });
            }
            catch (e) {
                return res.status(400).json({ msg: `Get User By Id Failed`, error: e });
            }
        });
    }
};
//# sourceMappingURL=Posyandu.controller.js.map