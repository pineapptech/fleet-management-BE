"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (res, user) => {
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    if (token) {
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // use secure cookies in production only
            sameSite: 'strict', //prevent CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
        });
    }
    console.log(`Token generated for user ${user._id}`);
    return token;
};
exports.default = generateToken;
