"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const allocate_controller_1 = __importDefault(require("../controllers/allocate.controller"));
const allocate_middleware_1 = __importDefault(require("../middlewares/allocate.middleware"));
const allocateRouter = express_1.default.Router();
const allocateVehicleController = new allocate_controller_1.default();
allocateRouter.route('/allocate').post(allocate_middleware_1.default, allocateVehicleController.allocateVehicle);
exports.default = allocateRouter;
