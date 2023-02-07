import { Request, Response } from 'express'
import mongoose from 'mongoose'
import config from "../config/config";
import { S3 } from 'aws-sdk';
import { uploadToS3 } from "../services/uploadToS3";
const requireDir = require('require-dir')
requireDir('../models');

const Posyandu = mongoose.model("Posyandu")
const User = mongoose.model("User")


export default {
    async create(req: Request, res: Response) {
        try {
            if(req.file){
                const s3 = new S3({
                    accessKeyId: config.aws_access_key_id,
                    secretAccessKey: config.aws_secret_access_key,
                });
                console.log("file stobject", req.file)
                const uploadRes = await uploadToS3(s3, req.file);
                const createPosyandu = await Posyandu.create(req.body)
                const updatePosyandu = await Posyandu.findByIdAndUpdate(createPosyandu.id, {
                    photo: "https://d1x1dyl0o67nta.cloudfront.net/" + String(uploadRes.data)
                })
                return res.status(200).json({ msg: `Success Create Posyandu`, posyandu: updatePosyandu });
            } else {
                const createPosyandu = await Posyandu.create(req.body)
                return res.status(200).json({ msg: `Success Create Posyandu`, posyandu: createPosyandu });
            }   
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
            if(req.file){
                const s3 = new S3({
                    accessKeyId: config.aws_access_key_id,
                    secretAccessKey: config.aws_secret_access_key,
                });
                console.log("file stobject", req.file)
                const uploadRes = await uploadToS3(s3, req.file);
                await Posyandu.findByIdAndUpdate(req.params.id, {
                    photo: "https://d1x1dyl0o67nta.cloudfront.net/" + String(uploadRes.data)
                })
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
            return res.status(400).json({ msg: `Get Posyandu Failed`, error: e })
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
    },
    async delete(req: Request, res: Response){
        try {
            const posyandu = await Posyandu.deleteOne({ _id: req.params.id});
            return res.status(200).json({msg: `Delete Posyandu Success`, posyandu: posyandu})
        } catch (e) {
            return res.status(400).json({ msg: `Delete Posyandu Failed`, error: e })
        }
    }
}