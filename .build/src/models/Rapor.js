"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RaporSchema = new mongoose_1.Schema({
    tinggi_badan: {
        type: String,
        required: true,
    },
    berat_badan: {
        type: String,
        required: true,
    },
    umur: {
        type: String,
        required: true
    },
    imunisasi: [{
            hepatitis_b: {
                type: Boolean,
                default: false,
            },
            polio: {
                type: Boolean,
                default: false,
            },
            bcg: {
                type: Boolean,
                default: false,
            },
            dtp: {
                type: Boolean,
                default: false,
            },
            hib: {
                type: Boolean,
                default: false,
            },
            pcv: {
                type: Boolean,
                default: false,
            },
            rotavirus: {
                type: Boolean,
                default: false,
            },
            influenza: {
                type: Boolean,
                default: false,
            },
            mr: {
                type: Boolean,
                default: false,
            },
            je: {
                type: Boolean,
                default: false,
            },
            varisela: {
                type: Boolean,
                default: false,
            },
            hepatitis_a: {
                type: Boolean,
                default: false,
            },
            tifoid: {
                type: Boolean,
                default: false,
            },
            dengue: {
                type: Boolean,
                default: false,
            },
        }],
    anak: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Anak"
        }],
});
const Rapor = (0, mongoose_1.model)("Rapor", RaporSchema);
exports.default = Rapor;
//# sourceMappingURL=Rapor.js.map