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
            }
            console.log(rapor)

            const createRapor = await Rapor.create(rapor)
            return res.status(200).json({ msg: `Success Rapor`, rapor: createRapor });
        } catch (e) {
            return res.status(400).json({ msg: `error create rapor`, error: e })
        }
    },
}