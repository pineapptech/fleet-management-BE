"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicle_controller_1 = require("../controllers/vehicle.controller");
const vehicleRoute = express_1.default.Router();
const vehicleController = new vehicle_controller_1.VehicleController();
vehicleRoute.route('/add-vehicle').post(vehicleController.uploadVehicleData);
vehicleRoute.route('/vehicle-record').get(vehicleController.getVehicles);
vehicleRoute.route('/vehicle-record/:id').get(vehicleController.getVehicle).patch(vehicleController.updateVehicle).delete(vehicleController.deleteVehicle);
exports.default = vehicleRoute;
