import { Schema, model } from "mongoose";
import IUser, {Erole} from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
    fullname: {
        type:String,
        trim: true
    },
    email: { 
        type:String,
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
})

const User = model<IUser>('User', userSchema);
export default User;