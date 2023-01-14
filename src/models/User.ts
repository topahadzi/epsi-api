import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name?: string,
    password: string,
    email?: string,
    roles?: string,
    nik?: string,
    validaSenha(password: string): Promise<boolean>
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
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
        required: true,
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

//Outra forma de criptografar a senha
UserSchema.methods.encryptaSenha = async (password: string): Promise<string> => {
   const salt = await bcrypt.genSalt(10)
   return bcrypt.hash(password, salt)
};

UserSchema.methods.validaSenha = async function(password: string): Promise<boolean>{
    return await bcrypt.compare(password, this.password);
}
const User = model<IUser>("User", UserSchema);
export default User;