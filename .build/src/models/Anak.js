"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AnakSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    umur: {
        type: String,
    },
    nik: {
        type: String,
        required: true,
    },
    orangtua: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tanggal_lahir: {
        type: String,
        required: true,
    },
    tempat_lahir: {
        type: String,
        required: true,
    },
    jenis_kelamin: {
        type: String,
        required: true,
    },
});
const Anak = (0, mongoose_1.model)("Anak", AnakSchema);
exports.default = Anak;
//# sourceMappingURL=Anak.js.map