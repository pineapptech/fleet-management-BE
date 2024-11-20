import IUser from '../interfaces/user.interface';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
class UserService {
    async createUserService(data: IUser): Promise<IUser> {
        const { fullname, email, password, confirmPassword, role } = data;
        if (password !== confirmPassword) {
            throw new Error('Password does not match');
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        return await User.create({ fullname, email, password: hashPassword, role }).then((user) => {
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
        const token = jwt.sign({ id: user._id, email: user.email }, String(process.env.SECRET_KEY), { expiresIn: '30d' });

        console.log(token);

        return { token, user };
    }
}

const userService = new UserService();
export default userService;
