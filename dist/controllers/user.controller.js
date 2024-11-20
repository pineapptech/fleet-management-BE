"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullname, email, password, confirmPassword, role } = req.body;
            try {
                if (!fullname || !email || !password || !confirmPassword) {
                    res.status(400).json({
                        status: false,
                        message: 'All fields are required'
                    });
                    return;
                }
                // check if user already exists in the database
                const emailExists = yield user_service_1.default.checkUserEmailExists(email);
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
                yield user_service_1.default.createUserService(req.body).then((user) => {
                    return res.status(200).json({
                        status: true,
                        message: 'User created successfully',
                        user
                    });
                });
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
            }
            catch (error) {
                res.status(500).json({
                    status: false,
                    message: 'Error: =>' + error.message,
                    stack: process.env.NODE_ENV !== 'production' ? error.stack : ''
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                if (!email || !password) {
                    res.status(401).json({
                        status: false,
                        message: 'No Field should be Left blank'
                    });
                    return;
                }
                const { token, user } = yield user_service_1.default.loginService(email, password);
                res.status(200).json({
                    status: true,
                    data: [
                        {
                            token,
                            fullname: user.fullname,
                        }
                    ]
                });
            }
            catch (error) {
                res.status(500).json({
                    status: false,
                    message: 'Error: =>' + error.message,
                    stack: process.env.NODE_ENV !== 'production' ? error.stack : ''
                });
            }
        });
    }
}
const userController = new UserController();
exports.default = userController;
