"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PosyanduSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
});
const Posyandu = (0, mongoose_1.model)("Posyandu", PosyanduSchema);
exports.default = Posyandu;
//# sourceMappingURL=Posyandu.js.map