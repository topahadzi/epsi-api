import express from 'express'

import UserController from '../controller/User.controller';
import AnakController from '../controller/Anak.controller';
import PosyanduController from '../controller/Posyandu.controller';
import BeritaController from '../controller/Berita.controller';
import passport from "passport";

const routes = express.Router();


//Get
// routes.get("/all", passport.authenticate("jwt", { session: false }), UserController.getAll)
routes.get("/api/user/:id", passport.authenticate("jwt", { session: false }), UserController.getUserById)
routes.get("/api/anak/:id", passport.authenticate("jwt", { session: false }), AnakController.getAnakById)
routes.get("/api/berita/:id", passport.authenticate("jwt", { session: false }), BeritaController.getBeritaById)
routes.get("/api/posyandu", passport.authenticate("jwt", { session: false }), PosyanduController.getAll)
routes.get("/api/berita", passport.authenticate("jwt", { session: false }), BeritaController.getAll)

//Post
routes.post("/api/signin", UserController.signin)
routes.post("/api/signup", UserController.signup)
routes.post("/api/user/update/:id", passport.authenticate("jwt", { session: false }), UserController.updateUser)
routes.post("/api/anak/update/:id", passport.authenticate("jwt", { session: false }), AnakController.updateAnak)
routes.post("/api/anak/create", passport.authenticate("jwt", { session: false }), AnakController.create)
routes.post("/api/posyandu/create", passport.authenticate("jwt", { session: false }), PosyanduController.create)
routes.post("/api/berita/create", passport.authenticate("jwt", { session: false }), BeritaController.create)
routes.post("/api/berita/update/:id", passport.authenticate("jwt", { session: false }), BeritaController.update)
export {routes};