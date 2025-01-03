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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleController = void 0;
const vehicle_service_1 = require("../services/vehicle.service");
const image_middleware_1 = __importDefault(require("../middlewares/image.middleware"));
const CustomError_1 = require("../error/CustomError");
class VehicleController {
    constructor() {
        this.uploadVehicleData = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // Handle the file upload and validation
            (0, image_middleware_1.default)(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return next(err); // Pass any Multer error to the next middleware
                }
                try {
                    const files = req.files;
                    const vehicleData = req.body;
                    // Process the vehicle data and images
                    const vehicle = yield this.vehicleService.uploadVehicleData(files, vehicleData);
                    res.status(201).json({
                        status: true,
                        message: 'Vehicle Data and Images uploaded successfully'
                    });
                }
                catch (error) {
                    // Handle any errors that occurred during the process
                    next(error); // Forward the error to the error handler
                }
            }));
        });
        this.getVehicles = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicle = yield this.vehicleService.getVehicles();
                if (vehicle.length === 0) {
                    res.status(404).json({
                        status: false,
                        message: 'No Vehicle Found, Please upload Vehicle to the Invetory...'
                    });
                    return;
                }
                res.status(200).json({
                    status: true,
                    length: vehicle.length,
                    data: vehicle
                });
            }
            catch (error) {
                res.status(500).json({
                    status: false,
                    message: error.message,
                    stack: process.env.NODE_ENV !== 'production' ? JSON.stringify(error.stack) : ''
                });
            }
        });
        this.getVehicle = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicle = yield this.vehicleService.getVehicle(req.params.id);
                res.status(200).json({
                    status: true,
                    data: vehicle
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
                console.error(error);
                res.status(500).json({
                    status: false,
                    message: 'Internal server error',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.updateVehicle = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicle = yield this.vehicleService.updateVehicle(req.body, req.params.id);
                res.status(200).json({
                    status: true,
                    message: `Vehicle Updated successfully`,
                    data: vehicle
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
        this.deleteVehicle = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const vehilce = yield this.vehicleService.deleteVehicle(req.params.id);
                res.status(200).json({
                    status: true,
                    message: `Vehicle ${vehilce} deleted successfully`
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
        this.vehicleService = new vehicle_service_1.VehicleService();
    }
}
exports.VehicleController = VehicleController;
