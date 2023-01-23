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
        required: true,
    },
    nik: {
        type: String,
        required: true,
    },
    orangtua: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});
const Anak = model<IAnak>("Anak", AnakSchema);
export default Anak;