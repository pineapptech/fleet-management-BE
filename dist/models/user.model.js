"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_interface_1 = require("../interfaces/user.interface");
const userSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    confirmPassword: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Erole),
        default: user_interface_1.Erole.user
    }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
