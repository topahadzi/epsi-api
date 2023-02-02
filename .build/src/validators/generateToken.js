"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
exports.default = {
    generateJwt(params = {}) {
        return jsonwebtoken_1.default.sign(params, config_1.default.jwtSecret, {
            expiresIn: '365d'
        });
    }
};
//# sourceMappingURL=generateToken.js.map