import { Request, Response } from 'express'
import mongoose from 'mongoose'
const requireDir = require('require-dir')
requireDir('../models');

const Rapor = mongoose.model("Rapor")


export default {
    async create(req: Request, res: Response) {
        try {
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
}