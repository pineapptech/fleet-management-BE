import { Request, Response } from 'express';
import userService from '../services/user.service';
import IUser from '../interfaces/user.interface';

class UserController {
    async registerUser(req: Request, res:Response): Promise<void> {
        const { fullname, email, password, confirmPassword, role }: IUser = req.body;

        try {
            if (!fullname || !email || !password || !confirmPassword) {
                res.status(400).json({
                    status: false,
                    message: 'All fields are required'
                });
                return;
            }

            // check if user already exists in the database
            const emailExists = await userService.checkUserEmailExists(email);
            if (emailExists) {
                res.status(400).json({
                    status: false,
                    message: 'User already exists'
                });
                return;
            }
            if (password.length < 6) {
                res.status(400).json({
                    status: false,
                    message: 'Password must be at least 6 characters'
                });
                return;
            }

            // const user_data: IUser = req.body;
             await userService.createUserService(req.body).then((user: IUser) => {
                 return res.status(200).json({
                    status: true,
                     message: 'User created successfully',
                     user
                 });
            })

            // // check if email password and confirm password matches

            // // if (password !== confirmPassword) {
            // //      res.status(400).json({
            // //         status: false,
            // //         message: 'Sorry, But your password does not match'
            // //     });
            // // }
            // // const user_data: IUser = req.body
            // await userService.createUserService(req.body).then((user: IUser) => {
            //     return res.status(200).json({
            //         status: true,
            //         message: 'User created successfully',
            //         user
            //     });
            // })
        } catch (error: any | unknown) {
             res.status(500).json({
                status: false,
                message: 'Error: =>' + error.message,
                stack: process.env.NODE_ENV !== 'production' ? error.stack : ''
            });
        }
    }

    async login(req: Request, res: Response) {
        
        const { email, password }: IUser = req.body;
        try {
            if (!email || !password) {
                res.status(401).json({
                    status: false,
                    message: 'No Field should be Left blank'
                });
                return 
            }

            const {token, user} = await userService.loginService(email, password)
            res.status(200).json({
                status: true,
                data: [
                    {
                        token,
                        fullname: user.fullname,
                    }
                ]
            })
            
        } catch (error : any | unknown) {
            res.status(500).json({
                status: false,
                message: 'Error: =>' + error.message,
                stack: process.env.NODE_ENV !== 'production' ? error.stack : ''
            });
        }
    }
}

const userController = new UserController();
export default userController;
