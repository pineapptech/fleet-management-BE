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
exports.AssignService = void 0;
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const fs_1 = __importDefault(require("fs"));
const assign_model_1 = __importDefault(require("../models/assign.model"));
const CustomError_1 = require("../error/CustomError");
class AssignService {
    uploadFile(file, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(file);
            try {
                const result = yield cloudinary_config_1.default.uploader.upload(file.path, { folder: 'assigned' });
                fs_1.default.unlinkSync(file.path);
                const upload = yield assign_model_1.default.create(Object.assign(Object.assign({}, data), { driver_img_url: result.secure_url }));
                return upload;
            }
            catch (error) {
                if (file.path && fs_1.default.existsSync(file.path)) {
                    fs_1.default.unlinkSync(file.path);
                }
                throw error;
            }
        });
    }
    getAllAssignedVehicles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield assign_model_1.default.find();
        });
    }
    getAssignedVehicle(vehicleId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!vehicleId) {
                throw new CustomError_1.ValidationError('Vehicle ID is required');
            }
            const vehicle = yield assign_model_1.default.findById(vehicleId);
            if (!vehicle) {
                throw new CustomError_1.ValidationError('Vehicle Not Found');
            }
            return vehicle;
        });
    }
    updateAssignVehicle(updatedData, vehicleId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!vehicleId) {
                throw new CustomError_1.ValidationError('Vehicle ID is required');
            }
            const vehicle = yield assign_model_1.default.findByIdAndUpdate(vehicleId, updatedData, {
                new: true,
                runValidators: true
            });
            if (!vehicle) {
                throw new CustomError_1.NotFoundError('Vehicle Not Found');
            }
            return vehicle;
        });
    }
    deleteVehicle(vehicleId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!vehicleId) {
                throw new CustomError_1.ValidationError('Vehicle ID is required');
            }
            const vehicle = yield assign_model_1.default.findByIdAndDelete(vehicleId);
            if (!vehicle) {
                throw new CustomError_1.NotFoundError('Vehicle Not Found');
            }
            return vehicle;
        });
    }
}
exports.AssignService = AssignService;
