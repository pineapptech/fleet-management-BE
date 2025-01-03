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
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const fs_1 = __importDefault(require("fs"));
const maintenance_model_1 = __importDefault(require("../models/maintenance.model"));
const generateVehicleID_1 = require("../utils/generateVehicleID");
class MaintenanceService {
    constructor() {
        this.createMaintenance = (file, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield cloudinary_config_1.default.uploader.upload(file.path, { folder: 'maintenance' });
                process.env.NODE_ENV !== 'production' ? console.log(result) : '';
                fs_1.default.unlinkSync(file.path);
                const vehicle_id = (0, generateVehicleID_1.generateVehicleID)();
                console.log(vehicle_id);
                const upload = maintenance_model_1.default.create(Object.assign(Object.assign({ vehicle_id }, data), { invoice_img_url: result.secure_url }));
                return upload;
            }
            catch (error) {
                if (file.path && fs_1.default.existsSync(file.path)) {
                    fs_1.default.unlinkSync(file.path);
                }
                throw error;
            }
        });
        this.getVehicleMaintenance = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const maintainedVehicle = yield maintenance_model_1.default.find();
                return maintainedVehicle;
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
        this.getVehicleMaintenanceById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const maintainedVehicle = yield maintenance_model_1.default.findById(id);
                return maintainedVehicle;
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
        this.updateVehicleMaintenance = (id, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedVehicle = yield maintenance_model_1.default.findByIdAndUpdate(id, data, { new: true });
                return updatedVehicle;
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
        this.deleteVehicleMaintenance = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedVehicle = yield maintenance_model_1.default.findByIdAndDelete(id);
                return deletedVehicle;
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
    }
}
exports.default = MaintenanceService;
