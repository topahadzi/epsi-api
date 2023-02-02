import { Request, Response } from 'express'
import mongoose from 'mongoose'
const requireDir = require('require-dir')
requireDir('../models');

const Berita = mongoose.model("Berita")

export default {
    async create(req: Request, res: Response) {
        try {
            const createBerita = await Berita.create(req.body)

            return res.status(200).json({ msg: `Success Create Berita`, berita: createBerita });
                
        } catch (e) {
            return res.status(400).json({ msg: `error create berita`, error: e })
        }
    },
    async update(req: Request, res: Response) {
        try {
            const berita = await Berita.findById(req.params.id);
            if (!berita) {
                return res.status(400).json({ msg: "berita tidak Ada" });
            }
            const update = await Berita.findByIdAndUpdate(req.params.id, req.body)
            return res.status(200).json({ msg: `Success Update`, berita: update});
        } catch (e) {
            console.log(e)
            return res.status(400).json({ msg: `Update Berita Failed`, error: e })
        }
    },
    async getBeritaById(req: Request, res: Response) {
        try {
            const berita = await Berita.findById(req.params.id);
            return res.status(200).json({msg: `Get Berita`, berita: berita})
        } catch (e) {
            return res.status(400).json({ msg: `Get Berita By Id Failed`, error: e })
        }
    },
    async getAll(req: Request, res: Response) {
        try {
            const berita = await Berita.find();;
            return res.status(200).json({msg: `Get All Berita`, berita: berita})
        } catch (e) {
            return res.status(400).json({ msg: `Get Berita All Failed`, error: e })
        }
    }
}