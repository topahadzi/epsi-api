import { Request, Response } from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
import gnt from '../validators/generateToken';
// import { IUser } from '../models/User';
const requireDir = require('require-dir')
requireDir('../models');


const User = mongoose.model("User")

export default {
    async signin(req: Request, res: Response) {
        try {
            if (!req.body.email || !req.body.password) {
                return res
                  .status(400)
                  .json({ msg: "Please. Send your email and password" });
              }
            const user = await User.findOne({ email: req.body.email });
            console.log(user)
            if (!await bcrypt.compare(req.body.password, user.password)) {
                return res.status(200).json({ msg: `error logon`, error: 'Cannot found logon' })
            }
            const token: string = gnt.generateJwt({ id: user.id })
            if (user === null) {
                return res.status(400).json({ msg: `error logon`, error: 'Cannot found logon' })
            }else{
                return res.header('auth-token', token).status(200).json({ msg: `success logon`, user: user, access_token: token })
            }
                
        } catch (e) {
            return res.status(400).json({ msg: `error login`, error: e })
        }
    },

    async signup(req: Request, res: Response) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ msg: "User sudah Ada" });
            }
            console.log(req.body.roles)
            if (req.body.roles != "orangtua" && req.body.roles != "kader") {
                return res
                  .status(400)
                  .json({ msg: "Roles tidak ada" });
            }
            const newuser = new User({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                roles: req.body.roles,
                nik: req.body.nik,
            })
            console.log(user)
            const createUser = await newuser.save()
            const token: string = gnt.generateJwt({ id: newuser.id })
            return res.header('auth-token', token).status(200).json({ msg: `Success Register`, user: createUser, access_token: token });
        } catch (e) {
            console.log(e)
            return res.status(400).json({ msg: `Signup Failed`, error: e })
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const createUser = await (await User.find()).length
            return res.status(200).json({msg: `All Works`, SizeOfDataBase: `${createUser} Pessoas Cadastradas`})
        } catch (e) {
            return res.status(400).json({ msg: `All Failed`, error: e })
        }
    }
}