import { Request, Response } from 'express'
import mongoose from 'mongoose'
const requireDir = require('require-dir')
requireDir('../models');

const Rapor = mongoose.model("Rapor")


export default {
    async create(req: Request, res: Response) {
        try {
            const searchRapor = await Rapor.find({ name: req.body.name, anak: req.body.anak });
            if (searchRapor) {
                return res.status(400).json({ msg: "Rapor Sudah Ada" });
            }
            const rapor = {
                ...req.body,
                umur: "12",
                imunisasi: {
                    hepatitis_b: req.body.hepatitis_b,
                    polio: req.body.polio,
                    bcg: req.body.bcg,
                    dtp: req.body.dtp,
                    hib: req.body.hib,
                    pcv: req.body.pcv,
                    rotavirus: req.body.rotavirus,
                    influenza: req.body.influenza,
                    mr: req.body.mr,
                    je: req.body.je,
                    varisela: req.body.varisela,
                    hepatitis_a: req.body.hepatitis_a,
                    tifoid: req.body.tifoid,
                    dengue: req.body.dengue
                }
            }
            console.log(rapor)

            const createRapor = await Rapor.create(rapor)
            return res.status(200).json({ msg: `Success Rapor`, rapor: createRapor });
        } catch (e) {
            return res.status(400).json({ msg: `error create rapor`, error: e })
        }
    },
    async getRaporByAnakId(req: Request, res: Response) {
        try {
            const rapor = await Rapor.find({ anak: req.params.id });
            return res.status(200).json({msg: `Get Rapor By Anak Id`, rapor: rapor})
        } catch (e) {
            return res.status(400).json({ msg: `Get Rapor By Anak Id Failed`, error: e })
        }
    },
    async getRaporById(req: Request, res: Response) {
        try {
            const rapor = await Rapor.findById(req.params.id);
            return res.status(200).json({msg: `Get Rapor By Id`, rapor: rapor})
        } catch (e) {
            return res.status(400).json({ msg: `Get Rapor By Id Failed`, error: e })
        }
    },
    // async getAll(req: Request, res: Response) {
    //     try {
    //         const berita = await Berita.find().sort({createdAt: -1});;
    //         return res.status(200).json({msg: `Get All Berita`, berita: berita})
    //     } catch (e) {
    //         return res.status(400).json({ msg: `Get Berita All Failed`, error: e })
    //     }
    // },
}