import { Request, Response } from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
import gnt from '../validators/generateToken';
import { uploadToS3 } from "../services/uploadToS3";
import config from "../config/config";
import { S3 } from 'aws-sdk';

// import { IUser } from '../models/User';
const requireDir = require('require-dir')
requireDir('../models');


const User = mongoose.model("User")
const Rapor = mongoose.model("Rapor")
const Anak = mongoose.model("Anak")

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

            if(req.file){
                const s3 = new S3({
                    accessKeyId: config.aws_access_key_id,
                    secretAccessKey: config.aws_secret_access_key,
                });
                console.log("file stobject", req.file)
                const uploadRes = await uploadToS3(s3, req.file);
                await User.findByIdAndUpdate(req.params.id, {
                    photo: "https://d1x1dyl0o67nta.cloudfront.net/" + String(uploadRes.data)
                })
            }
            const updateuser = await User.findByIdAndUpdate(req.params.id, req.body)
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
            return res.status(200).json({msg: `Get User`, user: user})
        } catch (e) {
            return res.status(400).json({ msg: `Get User By Id Failed`, error: e })
        }
    },
    async getGrafikByUser(req: Request, res: Response) {
        try {
            console.log(req.params.id)
            const user = await User.findById(req.params.id)
            let grafik = [];
            for (let anak in user.anak) {
                let anakObj = user.anak[anak]
                let anakid = anakObj.toString()
                const anak_name = await Anak.find({ _id: anakid}, { _id: 0, name: 1})
                const name = anak_name[0].name;
                const rapor = await Rapor.find({ anak: anakid })

                const response = {
                    anak: name,
                    rapor
                }
                grafik.push(response)
            }
            return res.status(200).json({msg: `Get Grafik`, Grafik: grafik})
        } catch (e) {
            return res.status(400).json({ msg: `Get Grafik Failed`, error: e })
        }
    },
    async getAll(req: Request, res: Response) {
        try {
            const user = await User.find();
            return res.status(200).json({msg: `Get All User`, user: user})
        } catch (e) {
            return res.status(400).json({ msg: `Get All User Failed`, error: e })
        }
    },
    async delete(req: Request, res: Response){
        try {
            const user = await User.deleteOne({ _id: req.params.id});
            return res.status(200).json({msg: `Delete User Success`, user: user})
        } catch (e) {
            return res.status(400).json({ msg: `Delete User Failed`, error: e })
        }
    }
}