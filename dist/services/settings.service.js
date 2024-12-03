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
exports.SettingsService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const CustomError_1 = require("../error/CustomError");
class SettingsService {
    constructor() {
        this.createUserSettings = (userData) => __awaiter(this, void 0, void 0, function* () {
            const { fullname, phone, email, role } = userData;
            const password = bcryptjs_1.default.hashSync(phone, 10);
            return yield user_model_1.default.create({ fullname, phone, email, password, role }).then((user) => {
                return user;
            });
        });
        this.getUserData = () => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.find({ role: 'user' });
            if (user.length === 0) {
                throw new CustomError_1.NotFoundError(`User not found`);
            }
            return user;
        });
        this.updateUserData = (updatedData, userId) => __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new CustomError_1.ValidationError(`User ${userId} is Required`);
            }
            const user = yield user_model_1.default.findByIdAndUpdate(userId, updatedData, {
                new: true,
                runValidators: true
            });
            if (!user) {
                throw new CustomError_1.NotFoundError(`User  not found`);
            }
            return user;
        });
        this.deletUserData = (userId) => __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new CustomError_1.ValidationError(`User ${userId} is requried`);
            }
            const user = yield user_model_1.default.findByIdAndDelete(userId);
            if (!user) {
                throw new CustomError_1.NotFoundError(`User  not found`);
            }
            return true;
        });
    }
}
exports.SettingsService = SettingsService;
