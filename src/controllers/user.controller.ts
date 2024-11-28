import { Request, Response } from 'express';
import userService from '../services/user.service';
import IUser from '../interfaces/user.interface';
import { UserValidation, ValidationError } from '../utils/user-validation.utils';
import organizationService from '../services/organization.service';

class UserController {
    async registerUser(req: Request, res: Response): Promise<void> {
        try {
            // Use Joi validation to validate incoming request body
            const validatedData = UserValidation.validate(req.body);
            const validatedOrgData = UserValidation.validate(req.body, UserValidation.organizationSchema);
            const file = req.file;

            // check if user already exists in the database
            const emailExists = await userService.checkUserEmailExists(validatedData.email);
            if (emailExists) {
                res.status(400).json({
                    status: false,
                    message: 'User already exists'
                });
                return;
            }

            // const user_data: IUser = req.body;
            // await userService.createUserService(validatedData).then((user: IUser) => {
            //     return res.status(200).json({
            //         status: true,
            //         message: 'User created successfully',
            //         user: user.email
            //     });
            // });
            const user = await userService.createUserService(validatedData);
            const org = await organizationService.createSerivce(file!, validatedOrgData);
            if (!user && !org) {
                res.status(401).json({
                    status: false,
                    message: 'User and Organization creation failed'
                });
                return;
            }
            res.status(201).json({
                status: true,
                message: `User with this email: ${user.email} and Organization ${org.name} created successfully`
            });
        } catch (error: any | unknown) {
            if (error instanceof ValidationError) {
                res.status(406).json({
                    status: false,
                    message: 'Validation Failed',
                    errors: error.errors,
                    name: error.name
                });
                return;
            }
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
                return;
            }

            const { token, user } = await userService.loginService(email, password);
            res.status(200).json({
                status: true,
                data: [
                    {
                        token,
                        email: user.email
                    }
                ]
            });
        } catch (error: any | unknown) {
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
