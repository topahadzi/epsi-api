import express from 'express'

import {UserClass} from '../controller/User.controller';
import { AnakClass } from '../controller/Anak.controller';
import {PosyanduClass} from '../controller/Posyandu.controller';
import {BeritaClass} from '../controller/Berita.controller';
import passport from "passport";
import { RaporClass } from '../controller/Rapor.controller';
// import multer from 'multer';

const AnakController = new AnakClass();
const BeritaController = new BeritaClass();
const PosyanduController = new PosyanduClass();
const RaporController = new RaporClass();
const UserController = new UserClass();
const routes = express.Router();
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
routes.get("/api/user/:id", passport.authenticate("jwt", { session: false }), UserController.getUserById)
routes.get("/api/anak/:id", passport.authenticate("jwt", { session: false }), AnakController.getAnakById)
routes.get("/api/berita/:id", passport.authenticate("jwt", { session: false }), BeritaController.getBeritaById)
routes.get("/api/posyandu/:id", passport.authenticate("jwt", { session: false }), PosyanduController.getPosyanduById)
routes.get("/api/posyandu/orangtua/:id", passport.authenticate("jwt", { session: false }), PosyanduController.getOrangtua)
routes.get("/api/posyandu/kader/:id", passport.authenticate("jwt", { session: false }), PosyanduController.getKader)
routes.get("/api/posyandu", passport.authenticate("jwt", { session: false }), PosyanduController.getAll)
routes.get("/api/berita", passport.authenticate("jwt", { session: false }), BeritaController.getAll)
routes.get("/api/rapor/anak/:id", passport.authenticate("jwt", { session: false }), RaporController.getRaporByAnakId)
routes.get("/api/rapor/:id", passport.authenticate("jwt", { session: false }), RaporController.getRaporById)
routes.get("/api/rapor/tinggi/anak/:id", passport.authenticate("jwt", { session: false }), RaporController.getDataGrafikTinggi)
routes.get("/api/rapor/berat/anak/:id", passport.authenticate("jwt", { session: false }), RaporController.getDataGrafikBerat)
routes.get("/api/user", passport.authenticate("jwt", { session: false }), UserController.getAll)
routes.get("/api/user/grafik/:id", passport.authenticate("jwt", { session: false }), UserController.getGrafikByUser)

//Post
routes.post("/api/signin", UserController.signin)
routes.post("/api/signup", UserController.signup)
routes.post("/api/user/update/:id", passport.authenticate("jwt", { session: false }), UserController.updateUser)
routes.post("/api/anak/update/:id", passport.authenticate("jwt", { session: false }), AnakController.updateAnak)
routes.post("/api/posyandu/update/:id", passport.authenticate("jwt", { session: false }), PosyanduController.update)
routes.post("/api/rapor/update/:id", passport.authenticate("jwt", { session: false }), RaporController.update)
routes.post("/api/anak/create", passport.authenticate("jwt", { session: false }), AnakController.create)
routes.post("/api/posyandu/create", passport.authenticate("jwt", { session: false }), PosyanduController.create)
routes.post("/api/berita/create", passport.authenticate("jwt", { session: false }), BeritaController.create)
routes.post("/api/rapor/create", passport.authenticate("jwt", { session: false }), RaporController.create)
routes.post("/api/berita/update/:id", passport.authenticate("jwt", { session: false }), BeritaController.update)

routes.delete("/api/berita/:id", passport.authenticate("jwt", { session: false }), BeritaController.delete)
routes.delete("/api/user/:id", passport.authenticate("jwt", { session: false }), UserController.delete)
routes.delete("/api/posyandu/:id", passport.authenticate("jwt", { session: false }), PosyanduController.delete)
export {routes};