"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BeritaSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    createdby: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Berita = (0, mongoose_1.model)("Berita", BeritaSchema);
exports.default = Berita;
//# sourceMappingURL=Berita.js.map