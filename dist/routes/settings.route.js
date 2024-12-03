"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settngsRoute = (0, express_1.Router)();
const settings_controller_1 = __importDefault(require("../controllers/settings.controller"));
const settings_service_1 = require("../services/settings.service");
const verify_token_middleware_1 = __importDefault(require("../middlewares/verify-token.middleware"));
const admin_access_middleware_1 = __importDefault(require("../middlewares/admin-access.middleware"));
const settingsService = new settings_service_1.SettingsService();
const settings = new settings_controller_1.default(settingsService);
settngsRoute.route('/').post(verify_token_middleware_1.default, admin_access_middleware_1.default.checkAdminAccess, settings.createUser);
exports.default = settngsRoute;
