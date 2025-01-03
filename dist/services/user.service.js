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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const CustomError_1 = require("../error/CustomError");
class UserService {
    createUserService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullname, email, phone, password, confirmPassword, role } = data;
            if (password !== confirmPassword) {
                throw new Error('Password does not match');
            }
            const hashPassword = bcryptjs_1.default.hashSync(password, 10);
            return yield user_model_1.default.create({ fullname, phone, email, password: hashPassword, role }).then((user) => {
                return user;
            });
        });
    }
    checkUserEmailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkEmailExist = yield user_model_1.default.findOne({ email });
            return checkEmailExist !== null;
        });
    }
    loginService(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                throw new Error(`User with this email ${email} does not exists`);
            }
            const validPassword = bcryptjs_1.default.compareSync(password, user.password);
            if (!validPassword) {
                throw new Error(`Email or Password is Incorrect`);
            }
            return user;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new CustomError_1.ValidationError(`ID is required`);
            const user = yield user_model_1.default.findById({ _id: id });
            if (!user)
                throw new CustomError_1.NotFoundError(`User ${id} not found`);
            return user;
        });
    }
}
const userService = new UserService();
exports.default = userService;
