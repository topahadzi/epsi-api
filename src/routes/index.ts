import express from 'express'

import UserController from '../controller/User.controller';
import passport from "passport";

const routes = express.Router();


//Get
routes.get("/all", passport.authenticate("jwt", { session: false }), UserController.getAll)

//Post
routes.post("/api/signin", UserController.signin)
routes.post("/api/signup", UserController.signup)


export {routes};