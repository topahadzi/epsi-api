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
const Anak = mongoose_1.default.model("Anak");
const User = mongoose_1.default.model("User");
exports.default = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const anak = yield Anak.findOne({ nik: req.body.nik });
                console.log(anak);
                if (anak) {
                    return res.status(400).json({ msg: "Anak Sudah Ada" });
                }
                const createAnak = yield Anak.create(req.body);
                const updateUser = yield User.findByIdAndUpdate(req.body.orangtua, {
                    $push: { anak: createAnak.id }
                });
                return res.status(200).json({ msg: `Success Anak`, user: updateUser, anak: createAnak });
            }
            catch (e) {
                return res.status(400).json({ msg: `error create anak`, error: e });
            }
        });
    },
    updateAnak(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const anak = yield Anak.findById(req.params.id);
                if (!anak) {
                    return res.status(400).json({ msg: "Anak tidak Ada" });
                }
                const updateanak = yield Anak.findByIdAndUpdate(req.params.id, req.body);
                return res.status(200).json({ msg: `Success Update`, user: updateanak });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ msg: `Update Anak Failed`, error: e });
            }
        });
    },
    getAnakById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const anak = yield Anak.findById(req.params.id);
                return res.status(200).json({ msg: `Get Anak`, Anak: anak });
            }
            catch (e) {
                return res.status(400).json({ msg: `Get Anak By Id Failed`, error: e });
            }
        });
    }
};
//# sourceMappingURL=Anak.controller.js.map