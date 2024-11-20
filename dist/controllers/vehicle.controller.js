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
        this.vehicleService = new vehicle_service_1.VehicleService();
    }
}
exports.VehicleController = VehicleController;
