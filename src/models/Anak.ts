import { Document, Schema, model } from 'mongoose';

export interface IAnak extends Document {


}
const AnakSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    umur: {
        type: String,
    },
    nik: {
        type: String,
        required: true,
    },
    orangtua: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tanggal_lahir: {
        type: String,
        required: true,
    },
    tempat_lahir: {
        type: String,
        required: true,
    },
    jenis_kelamin: {
        type: String,
        required: true,
    },

});
const Anak = model<IAnak>("Anak", AnakSchema);
export default Anak;