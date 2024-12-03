import bcrypt from 'bcryptjs';
import IUser from '../interfaces/user.interface';
import User from '../models/user.model';
import { NotFoundError, ValidationError } from '../error/CustomError';

export class SettingsService {
    public createUserSettings = async (userData: Partial<IUser>): Promise<IUser> => {
        const { fullname, phone, email, role } = userData;

        const password = bcrypt.hashSync(phone!, 10);

        return await User.create({ fullname, phone, email, password, role }).then((user) => {
            return user;
        });
    };

    public getUserData = async (UserId: string): Promise<IUser | null> => {
        const user = await User.findById(UserId);
        if (!user) {
            throw new NotFoundError(`User ${UserId} not found`);
        }
        return user;
    };

    public updateUserData = async (updatedData: Partial<IUser>, userId: string): Promise<IUser | null> => {
        if (!userId) {
            throw new ValidationError(`User ${userId} is Required`);
        }
        const user = await User.findByIdAndUpdate(userId, updatedData, {
            new: true,
            runValidators: true
        });
        if (!user) {
            throw new NotFoundError(`User  not found`);
        }
        return user;
    };

    public deletUserData = async (userId: string): Promise<boolean> => {
        if (!userId) {
            throw new ValidationError(`User ${userId} is requried`);
        }

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new NotFoundError(`User  not found`);
        }
        return true;
    };
}
