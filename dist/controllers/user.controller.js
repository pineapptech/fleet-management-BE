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
const user_validation_utils_1 = require("../utils/user-validation.utils");
const organization_service_1 = __importDefault(require("../services/organization.service"));
class UserController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Use Joi validation to validate incoming request body
                const validatedData = user_validation_utils_1.UserValidation.validate(req.body);
                const validatedOrgData = user_validation_utils_1.UserValidation.validate(req.body, user_validation_utils_1.UserValidation.organizationSchema);
                const file = req.file;
                // check if user already exists in the database
                const emailExists = yield user_service_1.default.checkUserEmailExists(validatedData.email);
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
                const user = yield user_service_1.default.createUserService(validatedData);
                const org = yield organization_service_1.default.createSerivce(file, validatedOrgData);
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
            }
            catch (error) {
                if (error instanceof user_validation_utils_1.ValidationError) {
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
                            email: user.email
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
