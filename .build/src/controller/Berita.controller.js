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
const Berita = mongoose_1.default.model("Berita");
exports.default = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createBerita = yield Berita.create(req.body);
                return res.status(200).json({ msg: `Success Create Berita`, berita: createBerita });
            }
            catch (e) {
                return res.status(400).json({ msg: `error create berita`, error: e });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const berita = yield Berita.findById(req.params.id);
                if (!berita) {
                    return res.status(400).json({ msg: "berita tidak Ada" });
                }
                const update = yield Berita.findByIdAndUpdate(req.params.id, req.body);
                return res.status(200).json({ msg: `Success Update`, berita: update });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ msg: `Update Berita Failed`, error: e });
            }
        });
    },
    getBeritaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const berita = yield Berita.findById(req.params.id);
                return res.status(200).json({ msg: `Get Berita`, berita: berita });
            }
            catch (e) {
                return res.status(400).json({ msg: `Get Berita By Id Failed`, error: e });
            }
        });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const berita = yield Berita.find();
                ;
                return res.status(200).json({ msg: `Get All Berita`, berita: berita });
            }
            catch (e) {
                return res.status(400).json({ msg: `Get Berita All Failed`, error: e });
            }
        });
    }
};
//# sourceMappingURL=Berita.controller.js.map