import { Document, Schema, model } from 'mongoose';

export interface IRapor extends Document {


}

const RaporSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tinggi_badan: {
        type: Number,
        required: true,
    },
    berat_badan: {
        type: Number,
        required: true,
    },
    umur: {
        type: String,
        required: true
    },
    bulan: {
        type: Number,
        required: true
    },
    imunisasi: [{
        hepatitis_b: {
            type: Boolean,
            default: false,
        },
        polio: {
            type: Boolean,
            default: false,
        },
        bcg: {
            type: Boolean,
            default: false,
        },
        dtp: {
            type: Boolean,
            default: false,
        },
        hib: {
            type: Boolean,
            default: false,
        },
        pcv: {
            type: Boolean,
            default: false,
        },
        rotavirus: {
            type: Boolean,
            default: false,
        },
        influenza: {
            type: Boolean,
            default: false,
        },
        mr: {
            type: Boolean,
            default: false,
        },
        je: {
            type: Boolean,
            default: false,
        },
        varisela: {
            type: Boolean,
            default: false,
        },
        hepatitis_a: {
            type: Boolean,
            default: false,
        },
        tifoid: {
            type: Boolean,
            default: false,
        },
        dengue: {
            type: Boolean,
            default: false,
        }
    }],
    anak: {
        type: Schema.Types.ObjectId,
        ref: "Anak",
        required: true
    },
});
const Rapor = model<IRapor>("Rapor", RaporSchema);
export default Rapor;