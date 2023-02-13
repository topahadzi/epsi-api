import { Request, Response } from 'express'
import mongoose from 'mongoose'
import config from "../config/config";
import { S3 } from 'aws-sdk';
import { uploadToS3 } from "../services/uploadToS3";

const requireDir = require('require-dir')
requireDir('../models');

const Berita = mongoose.model("Berita")

export class BeritaClass {
    async create(req: Request, res: Response) {
        try {
            console.log(req.body)
            console.log(req.file)
            if(req.file){
                const s3 = new S3({
                    accessKeyId: config.aws_access_key_id,
                    secretAccessKey: config.aws_secret_access_key,
                });
                console.log("file stobject", req.file)
                const uploadRes = await uploadToS3(s3, req.file);
                const createBerita = await Berita.create(req.body)
                const updateBerita = await Berita.findByIdAndUpdate(createBerita.id, {
                    photo: "https://d1x1dyl0o67nta.cloudfront.net/" + String(uploadRes.data)
                })
                return res.status(200).json({ msg: `Success Create Berita`, berita: updateBerita });
            } else {
                const createBerita = await Berita.create(req.body)
                return res.status(200).json({ msg: `Success Create Berita`, berita: createBerita });
            }   
        } catch (e) {
            return res.status(400).json({ msg: `error create berita`, error: e })
        }
    }
    async update(req: Request, res: Response) {
        try {
            const berita = await Berita.findById(req.params.id);
            if (!berita) {
                return res.status(400).json({ msg: "berita tidak Ada" });
            }
            if(req.file){
                const s3 = new S3({
                    accessKeyId: config.aws_access_key_id,
                    secretAccessKey: config.aws_secret_access_key,
                });
                console.log("file stobject", req.file)
                const uploadRes = await uploadToS3(s3, req.file);
                await Berita.findByIdAndUpdate(req.params.id, {
                    photo: "https://d1x1dyl0o67nta.cloudfront.net/" + String(uploadRes.data)
                })
            }
            const update = await Berita.findByIdAndUpdate(req.params.id, req.body)
            return res.status(200).json({ msg: `Success Update`, berita: update});
        } catch (e) {
            console.log(e)
            return res.status(400).json({ msg: `Update Berita Failed`, error: e })
        }
    }
    async getBeritaById(req: Request, res: Response) {
        try {
            const berita = await Berita.findById(req.params.id).populate("createdby", "name");
            return res.status(200).json({msg: `Get Berita`, berita: berita})
        } catch (e) {
            return res.status(400).json({ msg: `Get Berita By Id Failed`, error: e })
        }
    }
    async getAll(req: Request, res: Response) {
        try {
            const berita = await Berita.find().sort({createdAt: -1});;
            return res.status(200).json({msg: `Get All Berita`, berita: berita})
        } catch (e) {
            return res.status(400).json({ msg: `Get Berita All Failed`, error: e })
        }
    }
    async delete(req: Request, res: Response){
        try {
            const berita = await Berita.deleteOne({ _id: req.params.id});
            return res.status(200).json({msg: `Delete Berita Success`, berita: berita})
        } catch (e) {
            return res.status(400).json({ msg: `Delete Berita Failed`, error: e })
        }
    }
}