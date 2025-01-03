"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRoute = express_1.default.Router();
userRoute.post('/register', user_controller_1.default.registerUser);
userRoute.route('/login').post(user_controller_1.default.login);
userRoute.route('/logout').post(user_controller_1.default.logout);
exports.default = userRoute;
