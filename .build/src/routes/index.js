"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const User_controller_1 = __importDefault(require("../controller/User.controller"));
const Anak_controller_1 = require("../controller/Anak.controller");
const Posyandu_controller_1 = require("../controller/Posyandu.controller");
const Berita_controller_1 = require("../controller/Berita.controller");
const passport_1 = __importDefault(require("passport"));
const Rapor_controller_1 = __importDefault(require("../controller/Rapor.controller"));
// import multer from 'multer';
const AnakController = new Anak_controller_1.AnakClass();
const BeritaController = new Berita_controller_1.BeritaClass();
const PosyanduController = new Posyandu_controller_1.PosyanduClass();
const routes = express_1.default.Router();
exports.routes = routes;
// const storage = multer.diskStorage({
//     destination: "/tmp/uploads"
//     // filename: function (req, file, cb) {
//     //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     //   cb(null, file.fieldname + '-' + uniqueSuffix)
//     // }
// })
// const upload = multer({ storage: storage })
//Get
// routes.get("/all", passport.authenticate("jwt", { session: false }), UserController.getAll)
routes.get("/api/user/:id", passport_1.default.authenticate("jwt", { session: false }), User_controller_1.default.getUserById);
routes.get("/api/anak/:id", passport_1.default.authenticate("jwt", { session: false }), AnakController.getAnakById);
routes.get("/api/berita/:id", passport_1.default.authenticate("jwt", { session: false }), BeritaController.getBeritaById);
routes.get("/api/posyandu/:id", passport_1.default.authenticate("jwt", { session: false }), PosyanduController.getPosyanduById);
routes.get("/api/posyandu/orangtua/:id", passport_1.default.authenticate("jwt", { session: false }), PosyanduController.getOrangtua);
routes.get("/api/posyandu/kader/:id", passport_1.default.authenticate("jwt", { session: false }), PosyanduController.getKader);
routes.get("/api/posyandu", passport_1.default.authenticate("jwt", { session: false }), PosyanduController.getAll);
routes.get("/api/berita", passport_1.default.authenticate("jwt", { session: false }), BeritaController.getAll);
routes.get("/api/rapor/anak/:id", passport_1.default.authenticate("jwt", { session: false }), Rapor_controller_1.default.getRaporByAnakId);
routes.get("/api/rapor/:id", passport_1.default.authenticate("jwt", { session: false }), Rapor_controller_1.default.getRaporById);
routes.get("/api/rapor/tinggi/anak/:id", passport_1.default.authenticate("jwt", { session: false }), Rapor_controller_1.default.getDataGrafikTinggi);
routes.get("/api/rapor/berat/anak/:id", passport_1.default.authenticate("jwt", { session: false }), Rapor_controller_1.default.getDataGrafikBerat);
routes.get("/api/user", passport_1.default.authenticate("jwt", { session: false }), User_controller_1.default.getAll);
routes.get("/api/user/grafik/:id", passport_1.default.authenticate("jwt", { session: false }), User_controller_1.default.getGrafikByUser);
//Post
routes.post("/api/signin", User_controller_1.default.signin);
routes.post("/api/signup", User_controller_1.default.signup);
routes.post("/api/user/update/:id", passport_1.default.authenticate("jwt", { session: false }), User_controller_1.default.updateUser);
routes.post("/api/anak/update/:id", passport_1.default.authenticate("jwt", { session: false }), AnakController.updateAnak);
routes.post("/api/posyandu/update/:id", passport_1.default.authenticate("jwt", { session: false }), PosyanduController.update);
routes.post("/api/rapor/update/:id", passport_1.default.authenticate("jwt", { session: false }), Rapor_controller_1.default.update);
routes.post("/api/anak/create", passport_1.default.authenticate("jwt", { session: false }), AnakController.create);
routes.post("/api/posyandu/create", passport_1.default.authenticate("jwt", { session: false }), PosyanduController.create);
routes.post("/api/berita/create", passport_1.default.authenticate("jwt", { session: false }), BeritaController.create);
routes.post("/api/rapor/create", passport_1.default.authenticate("jwt", { session: false }), Rapor_controller_1.default.create);
routes.post("/api/berita/update/:id", passport_1.default.authenticate("jwt", { session: false }), BeritaController.update);
routes.delete("/api/berita/:id", passport_1.default.authenticate("jwt", { session: false }), BeritaController.delete);
routes.delete("/api/user/:id", passport_1.default.authenticate("jwt", { session: false }), User_controller_1.default.delete);
routes.delete("/api/posyandu/:id", passport_1.default.authenticate("jwt", { session: false }), PosyanduController.delete);
//# sourceMappingURL=index.js.map