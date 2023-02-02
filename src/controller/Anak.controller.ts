import { Request, Response } from 'express'
import mongoose from 'mongoose'
const requireDir = require('require-dir')
requireDir('../models');

const Anak = mongoose.model("Anak")
const User = mongoose.model("User")

export default {
    async create(req: Request, res: Response) {
        try {
            const anak = await Anak.findOne({ nik: req.body.nik });
            console.log(anak)
            if (anak) {
                return res.status(400).json({ msg: "Anak Sudah Ada" });
            }
            const createAnak = await Anak.create(req.body)
            const updateUser = await User.findByIdAndUpdate(req.body.orangtua, {
                        $push: { anak: createAnak.id } 
            })
            return res.status(200).json({ msg: `Success Anak`, user: updateUser, anak: createAnak });
                
        } catch (e) {
            return res.status(400).json({ msg: `error create anak`, error: e })
        }
    },
    async updateAnak(req: Request, res: Response) {
        try {
            const anak = await Anak.findById(req.params.id);
            if (!anak) {
                return res.status(400).json({ msg: "Anak tidak Ada" });
            }
            const updateanak = await Anak.findByIdAndUpdate(req.params.id, req.body)
            return res.status(200).json({ msg: `Success Update`, user: updateanak});
        } catch (e) {
            console.log(e)
            return res.status(400).json({ msg: `Update Anak Failed`, error: e })
        }
    },
    async getAnakById(req: Request, res: Response) {
        try {
            const anak = await Anak.findById(req.params.id);
            return res.status(200).json({msg: `Get Anak`, anak: anak})
        } catch (e) {
            return res.status(400).json({ msg: `Get Anak By Id Failed`, error: e })
        }
    }

}