"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const User_controller_1 = __importDefault(require("../controller/User.controller"));
const Anak_controller_1 = __importDefault(require("../controller/Anak.controller"));
const Posyandu_controller_1 = __importDefault(require("../controller/Posyandu.controller"));
const Berita_controller_1 = __importDefault(require("../controller/Berita.controller"));
const passport_1 = __importDefault(require("passport"));
const multer_1 = __importDefault(require("multer"));
const routes = express_1.default.Router();
exports.routes = routes;
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: 'uploads/',
    })
});
//Get
// routes.get("/all", passport.authenticate("jwt", { session: false }), UserController.getAll)
routes.get("/api/user/:id", passport_1.default.authenticate("jwt", { session: false }), User_controller_1.default.getUserById);
routes.get("/api/anak/:id", passport_1.default.authenticate("jwt", { session: false }), Anak_controller_1.default.getAnakById);
routes.get("/api/berita/:id", passport_1.default.authenticate("jwt", { session: false }), Berita_controller_1.default.getBeritaById);
routes.get("/api/posyandu/:id", passport_1.default.authenticate("jwt", { session: false }), Posyandu_controller_1.default.getPosyanduById);
routes.get("/api/posyandu", passport_1.default.authenticate("jwt", { session: false }), Posyandu_controller_1.default.getAll);
routes.get("/api/berita", passport_1.default.authenticate("jwt", { session: false }), Berita_controller_1.default.getAll);
//Post
routes.post("/api/signin", User_controller_1.default.signin);
routes.post("/api/signup", User_controller_1.default.signup);
routes.post("/api/user/update/:id", passport_1.default.authenticate("jwt", { session: false }), upload.single('upload'), User_controller_1.default.updateUser);
routes.post("/api/anak/update/:id", passport_1.default.authenticate("jwt", { session: false }), Anak_controller_1.default.updateAnak);
routes.post("/api/anak/create", passport_1.default.authenticate("jwt", { session: false }), Anak_controller_1.default.create);
routes.post("/api/posyandu/create", passport_1.default.authenticate("jwt", { session: false }), Posyandu_controller_1.default.create);
routes.post("/api/berita/create", passport_1.default.authenticate("jwt", { session: false }), Berita_controller_1.default.create);
routes.post("/api/berita/update/:id", passport_1.default.authenticate("jwt", { session: false }), Berita_controller_1.default.update);
//# sourceMappingURL=index.js.map