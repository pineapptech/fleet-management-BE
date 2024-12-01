"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const organization_controller_1 = __importDefault(require("../controllers/organization.controller"));
const express_1 = require("express");
const verify_token_middleware_1 = __importDefault(require("../middlewares/verify-token.middleware"));
const multer_middleware_1 = __importDefault(require("../middlewares/multer.middleware"));
const orgRouter = (0, express_1.Router)();
orgRouter.route('/create-org').post(verify_token_middleware_1.default, multer_middleware_1.default.upload.single('logo'), organization_controller_1.default.createOrganization);
exports.default = orgRouter;
