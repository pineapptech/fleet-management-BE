import { Document } from 'mongoose';

export enum Erole {
    manager = 'manager',
    user = 'user'
}
interface IUser extends Document {
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    role: Erole;
}

export default IUser;
