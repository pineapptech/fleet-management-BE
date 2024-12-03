import { Schema, model } from 'mongoose';
import IUser, { Erole } from '../interfaces/user.interface';

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            trim: true,
            unique: true
        },
        fullname: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },

        password: {
            type: String,
            trim: true
        },
        confirmPassword: {
            type: String,
            trim: true
        },
        role: {
            type: String,
            enum: Object.values(Erole),
            default: Erole.user
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const User = model<IUser>('User', userSchema);
export default User;
