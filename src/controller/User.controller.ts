import { Request, Response } from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
import gnt from '../validators/generateToken';
// import { IUser } from '../models/User';
const requireDir = require('require-dir')
requireDir('../models');


const User = mongoose.model("User")
const Posyandu = mongoose.model("Posyandu")

export default {
    async signin(req: Request, res: Response) {
        try {
            if (!req.body.email || !req.body.password) {
                return res
                  .status(400)
                  .json({ msg: "Please. Send your email and password" });
              }
            const user = await User.findOne({ email: req.body.email });
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
            if (req.body.roles != "orangtua" && req.body.roles != "kader") {
                return res
                  .status(400)
                  .json({ msg: "Roles tidak ada" });
            }
            const newuser = new User({
                name: req.body.name,
                nik: req.body.nik,
                password: req.body.password,
                email: req.body.email,
                roles: req.body.roles,
            })
            const createUser = await newuser.save()
            const token: string = gnt.generateJwt({ id: newuser.id })
            return res.header('auth-token', token).status(200).json({ msg: `Success Register`, user: createUser, access_token: token });
        } catch (e) {
            console.log(e)
            return res.status(400).json({ msg: `Signup Failed`, error: e })
        }
    },
    async updateUser(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(400).json({ msg: "User tidak Ada" });
            }
            const updateuser = await User.findByIdAndUpdate(req.params.id, req.body)
            if (req.body.posyandu){
                await Posyandu.findByIdAndUpdate(req.body.posyandu, {
                    $push: { user: req.params.id } 
                })
            }
            return res.status(200).json({ msg: `Success Update`, user: updateuser});
        } catch (e) {
            console.log(e)
            return res.status(400).json({ msg: `Update User Failed`, error: e })
        }
    },
    async getUserById(req: Request, res: Response) {
        try {
            console.log(req.params.id)
            const user = await User.findById(req.params.id).populate("anak").populate("posyandu");
            return res.status(200).json({msg: `Get User`, User: user})
        } catch (e) {
            return res.status(400).json({ msg: `Get User By Id Failed`, error: e })
        }
    }
    // async getAll(req: Request, res: Response) {
    //     try {
    //         const createUser = await (await User.find()).length
    //         return res.status(200).json({msg: `All Works`, SizeOfDataBase: `${createUser} Pessoas Cadastradas`})
    //     } catch (e) {
    //         return res.status(400).json({ msg: `All Failed`, error: e })
    //     }
    // }
}