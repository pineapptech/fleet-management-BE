"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_middleware_1 = __importDefault(require("../middlewares/multer.middleware"));
const assign_controller_1 = __importDefault(require("../controllers/assign.controller"));
const assignedRouter = (0, express_1.Router)();
assignedRouter.route('/assign-vehicle').post(multer_middleware_1.default.upload.single('driver_img_url'), assign_controller_1.default.assignVehicle);
exports.default = assignedRouter;
