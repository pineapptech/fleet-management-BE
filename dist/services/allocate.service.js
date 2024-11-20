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
exports.AllocateUploadService = void 0;
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const fs_1 = __importDefault(require("fs"));
const allocate_model_1 = __importDefault(require("../models/allocate.model"));
const generateVehicleID_1 = require("../utils/generateVehicleID");
class AllocateUploadService {
    uploadFile(file, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(file);
            try {
                const result = yield cloudinary_config_1.default.uploader.upload(file.path, { folder: 'allocate' });
                fs_1.default.unlinkSync(file.path);
                const vehicle_id = (0, generateVehicleID_1.generateVehicleID)();
                const upload = yield allocate_model_1.default.create(Object.assign(Object.assign({ vehicle_id }, data), { recipient_img_id: result.secure_url }));
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
    getAllocateVehicle() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield allocate_model_1.default.find();
        });
    }
}
exports.AllocateUploadService = AllocateUploadService;
