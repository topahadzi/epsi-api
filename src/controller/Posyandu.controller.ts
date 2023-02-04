import { Request, Response } from 'express'
import mongoose from 'mongoose'
const requireDir = require('require-dir')
requireDir('../models');

const Posyandu = mongoose.model("Posyandu")
const User = mongoose.model("User")


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
    async update(req: Request, res: Response) {
        try {
            const posyandu = await Posyandu.findById(req.params.id);
            if (!posyandu) {
                return res.status(400).json({ msg: "Posyandu tidak Ada" });
            }

            const updateposyandu = await Posyandu.findByIdAndUpdate(req.params.id, req.body)

            return res.status(200).json({ msg: `Success Update`, posyandu: updateposyandu});
        } catch (e) {
            console.log(e)
            return res.status(400).json({ msg: `Update Posyandu Failed`, error: e })
        }
    },
    async getAll(req: Request, res: Response) {
        try {
            const posyandu = await Posyandu.find();
            return res.status(200).json({msg: `Get Posyandu`, posyandu: posyandu})
        } catch (e) {
            return res.status(400).json({ msg: `Get Posyandu Fai    led`, error: e })
        }
    },
    async getPosyanduById(req: Request, res: Response) {
        try {
            const posyandu = await Posyandu.findById(req.params.id);
            return res.status(200).json({msg: `Get Posyandu`, posyandu: posyandu})
        } catch (e) {
            return res.status(400).json({ msg: `Get Posyandu By Id Failed`, error: e })
        }
    },
    async getOrangtua(req: Request, res: Response) {
        try {
            const posyandu = await User.find({ posyandu: req.params.id, roles: "orangtua" }).populate("anak");;
            return res.status(200).json({msg: `Get list orang tua`, orangtua: posyandu})
        } catch (e) {
            return res.status(400).json({ msg: `Get list orang tua Failed`, error: e })
        }
    },
    async getKader(req: Request, res: Response) {
        try {
            const posyandu = await User.find({ posyandu: req.params.id, roles: "kader" });;
            return res.status(200).json({msg: `Get list kader`, kader: posyandu})
        } catch (e) {
            return res.status(400).json({ msg: `Get list kader Failed`, error: e })
        }
    }
}