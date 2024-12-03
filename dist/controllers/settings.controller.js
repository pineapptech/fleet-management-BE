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
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../error/CustomError");
class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.settingsService.createUserSettings(req.body);
                if (!user) {
                    res.status(401).json({
                        status: false,
                        message: 'User Creattion Failed'
                    });
                    return;
                }
                res.status(200).json({
                    status: true,
                    message: 'User Created Successfully',
                    fullname: user.fullname,
                    email: user.email
                });
            }
            catch (error) {
                if (error instanceof CustomError_1.ValidationError) {
                    res.status(400).json({
                        status: false,
                        message: error.message
                    });
                    return;
                }
                if (error instanceof CustomError_1.NotFoundError) {
                    res.status(404).json({
                        status: false,
                        message: error.message
                    });
                    return;
                }
                // Log unexpected errors
                console.error(error);
                res.status(500).json({
                    status: false,
                    message: 'Internal server error',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.settingsService.getUserData();
                if (!user) {
                    res.status(401).json({
                        status: false,
                        message: 'User not found'
                    });
                    return;
                }
                res.status(200).json({
                    status: true,
                    data: user
                });
            }
            catch (error) {
                if (error instanceof CustomError_1.ValidationError) {
                    res.status(400).json({
                        status: false,
                        message: error.message
                    });
                    return;
                }
                if (error instanceof CustomError_1.NotFoundError) {
                    res.status(404).json({
                        status: false,
                        message: error.message
                    });
                    return;
                }
                // Log unexpected errors
                console.error(error);
                res.status(500).json({
                    status: false,
                    message: 'Internal server error',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.settingsService = settingsService;
    }
}
exports.default = SettingsController;
