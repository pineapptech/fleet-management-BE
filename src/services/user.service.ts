import IUser from '../interfaces/user.interface';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
class UserService {
    async createUserService(data: IUser): Promise<IUser> {
        const { fullname, email, phone, password, confirmPassword, role } = data;
        if (password !== confirmPassword) {
            throw new Error('Password does not match');
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        return await User.create({ fullname, phone, email, password: hashPassword, role }).then((user) => {
            return user;
        });
    }

    async checkUserEmailExists(email: string): Promise<boolean> {
        const checkEmailExist = await User.findOne({ email });
        return checkEmailExist !== null;
    }

    async loginService(email: string, password: string) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error(`User with this email ${email} does not exists`);
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            throw new Error(`Email or Password is Incorrect`);
        }

        return user;
    }
}

const userService = new UserService();
export default userService;
