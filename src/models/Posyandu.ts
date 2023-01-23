import { Document, Schema, model } from 'mongoose';

export interface IPosyandu extends Document {


}
const PosyanduSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
    gambar: {
        type: String,
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
});
const Posyandu = model<IPosyandu>("Posyandu", PosyanduSchema);
export default Posyandu;