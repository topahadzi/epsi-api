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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        required: true,
    },
    nik: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    jenis_kelamin: {
        type: String,
        required: false,
    },
    alamat: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    anak: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Anak"
        }],
    posyandu: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Posyandu",
    },
    verifikasi: {
        type: Boolean,
        default: false,
    },
    photo: {
        type: String,
    }
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const hash = yield bcryptjs_1.default.hash(user.password, 10);
        this.password = hash;
        return next();
    });
});
UserSchema.methods.encryptaSenha = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
});
UserSchema.methods.validaSenha = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, this.password);
    });
};
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map