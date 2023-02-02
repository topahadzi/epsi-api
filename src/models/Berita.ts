import { Document, Schema, model } from 'mongoose';

export interface IBerita extends Document {


}
const BeritaSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
});
const Berita = model<IBerita>("Berita", BeritaSchema);
export default Berita;