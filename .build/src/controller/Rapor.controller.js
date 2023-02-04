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
const Rapor = mongoose_1.default.model("Rapor");
exports.default = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rapor = Object.assign(Object.assign({}, req.body), { umur: "12", imunisasi: {
                        hepatitis_b: req.body.hepatitis_b,
                        polio: req.body.polio,
                        bcg: req.body.bcg,
                        dtp: req.body.dtp,
                        hib: req.body.hib,
                        pcv: req.body.pcv,
                        rotavirus: req.body.rotavirus,
                        influenza: req.body.influenza,
                        mr: req.body.mr,
                        je: req.body.je,
                        varisela: req.body.varisela,
                        hepatitis_a: req.body.hepatitis_a,
                        tifoid: req.body.tifoid,
                        dengue: req.body.dengue
                    } });
                console.log(rapor);
                const createRapor = yield Rapor.create(rapor);
                return res.status(200).json({ msg: `Success Rapor`, rapor: createRapor });
            }
            catch (e) {
                return res.status(400).json({ msg: `error create rapor`, error: e });
            }
        });
    },
};
//# sourceMappingURL=Rapor.controller.js.map