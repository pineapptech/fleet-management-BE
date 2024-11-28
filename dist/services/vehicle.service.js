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
exports.VehicleService = void 0;
const cloudinary_1 = require("cloudinary");
const vehicle_model_1 = __importDefault(require("../models/vehicle.model"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
class VehicleService {
    constructor() {
        this.getVehicles = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicles = yield vehicle_model_1.default.find();
                return vehicles;
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
    }
    // Helper function to validate files
    validateFiles(files) {
        if (!files || !files.vehicle_img || !files.vehicle_img[0]) {
            throw new Error('Vehicle image file is missing');
        }
        if (!files.procurement_img || !files.procurement_img[0]) {
            throw new Error('Procurement image file is missing');
        }
    }
    // Helper function to wrap cloudinary upload_stream in a Promise
    uploadToCloudinary(fileBuffer, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const stream = cloudinary_1.v2.uploader.upload_stream({ folder }, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve((result === null || result === void 0 ? void 0 : result.secure_url) || ''); // Resolve with secure_url if available
                    }
                });
                stream.end(fileBuffer);
            });
        });
    }
    uploadVehicleData(files, vehicleData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate files before proceeding
                this.validateFiles(files);
                if (!vehicleData) {
                    throw new Error('All othr Vehicle Data are needed...');
                }
                // Upload images to Cloudinary
                const vehicleImgUrl = yield this.uploadToCloudinary(files.vehicle_img[0].buffer, 'vehicle_img');
                const procurementImgUrl = yield this.uploadToCloudinary(files.procurement_img[0].buffer, 'procurement_img');
                // Create a new vehicle entry
                const vehicle = yield vehicle_model_1.default.create(Object.assign({ image: vehicleImgUrl, procurement_img: procurementImgUrl }, vehicleData));
                return vehicle;
            }
            catch (error) {
                // console.error('Error in uploading vehicle data:', error);
                throw new Error(`${error.message}`);
            }
        });
    }
}
exports.VehicleService = VehicleService;
