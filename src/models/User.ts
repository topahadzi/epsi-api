import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    password: string,
    email?: string,
    roles?: string,
    nik?: string,
    name?: string,
    jenis_kelamin?: string,
    alamat?: string,
    validaSenha(password: string): Promise<boolean>
}

const UserSchema = new Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        required: true,
    },
    nik: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    jenis_kelamin: {
        type: String,
        required: false,
    },
    alamat: {
        type: String,
        required: false,
    },
    createdAt:{
        type: Date,
        default:Date.now,
    }
});

UserSchema.pre<IUser>("save", async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    this.password = hash;
    return next();
})


UserSchema.methods.encryptaSenha = async (password: string): Promise<string> => {
   const salt = await bcrypt.genSalt(10)
   return bcrypt.hash(password, salt)
};

UserSchema.methods.validaSenha = async function(password: string): Promise<boolean>{
    return await bcrypt.compare(password, this.password);
}
const User = model<IUser>("User", UserSchema);
export default User;