import { Request, Response } from 'express'
import mongoose from 'mongoose'
const requireDir = require('require-dir')
requireDir('../models');

const Posyandu = mongoose.model("Posyandu")


export default {
    async create(req: Request, res: Response) {
        try {
            const newposyandu = new Posyandu({
                name: req.body.name,
                alamat: req.body.alamat,
                gambar: req.body.gambar,
            })
            const posyandu = await Posyandu.findOne({ name: req.body.name });
            console.log(posyandu)
            if (posyandu) {
                return res.status(400).json({ msg: "Posyandu Sudah Ada" });
            }
            const createPosyandu = await newposyandu.save()
            return res.status(200).json({ msg: `Success Posyandu`, posyandu: createPosyandu });
                
        } catch (e) {
            return res.status(400).json({ msg: `error create posyandu`, error: e })
        }
    },
    async getAll(req: Request, res: Response) {
        try {
            const posyandu = await Posyandu.find().populate("user");;
            return res.status(200).json({msg: `Get Posyandu`, Posyandu: posyandu})
        } catch (e) {
            return res.status(400).json({ msg: `Get User By Id Failed`, error: e })
        }
    }
}