"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_middleware_1 = __importDefault(require("../middlewares/multer.middleware"));
const maintenance_controller_1 = __importDefault(require("../controllers/maintenance.controller"));
const maintenanceRoute = (0, express_1.Router)();
maintenanceRoute.route('/maintenance-record').post(multer_middleware_1.default.upload.single('invoice_img_url'), maintenance_controller_1.default.createMaintenance);
exports.default = maintenanceRoute;
