"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allocate_controller_1 = require("../controllers/allocate.controller");
const express_1 = require("express");
const multer_middleware_1 = __importDefault(require("../middlewares/multer.middleware"));
const allocatedRouter = (0, express_1.Router)();
const allocatedUploadController = new allocate_controller_1.AllocateUploadController();
allocatedRouter.route('/allocate').post(multer_middleware_1.default.upload.single('recipient_img_id'), allocatedUploadController.upload);
exports.default = allocatedRouter;
