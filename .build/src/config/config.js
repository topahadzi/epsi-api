"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb+srv://epsi:QzzZ6WsBLSqHLyjX@cluster0.xsaxvmh.mongodb.net/?retryWrites=true&w=majority',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    },
    aws_access_key_id: (_a = process.env.AWS_ACCESS_KEY_ID) !== null && _a !== void 0 ? _a : "AKIAZY6HWSJDWF37VSMO",
    aws_secret_access_key: (_b = process.env.AWS_SECRET_ACCESS_KEY) !== null && _b !== void 0 ? _b : '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',
    bucket_name: (_c = process.env.BUCKET_NAME) !== null && _c !== void 0 ? _c : 'epsi'
};
//# sourceMappingURL=config.js.map