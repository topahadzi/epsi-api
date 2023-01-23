import { Request, Response } from 'express'
import mongoose from 'mongoose'
const requireDir = require('require-dir')
requireDir('../models');

const Anak = mongoose.model("Anak")
const User = mongoose.model("User")

export default {
    async create(req: Request, res: Response) {
        try {
            const newanak = new Anak({
                name: req.body.name,
                umur: req.body.umur,
                orangtua: req.body.orangtua,
                nik: req.body.nik,
            })
            const anak = await Anak.findOne({ nik: req.body.nik });
            console.log(anak)
            if (anak) {
                return res.status(400).json({ msg: "Anak Sudah Ada" });
            }
            const createAnak = await newanak.save()
            const updateUser = await User.findByIdAndUpdate(req.body.orangtua, {
                        $push: { anak: createAnak.id } 
            })
            return res.status(200).json({ msg: `Success Anak`, user: updateUser, anak: createAnak });
                
        } catch (e) {
            return res.status(400).json({ msg: `error create anak`, error: e })
        }
    }
}