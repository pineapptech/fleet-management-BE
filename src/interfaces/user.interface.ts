import mongoose, { Document } from 'mongoose';

export enum Erole {
    manager = 'manager',
    user = 'user'
}
interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    fullname: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    role: Erole;
}

export default IUser;
