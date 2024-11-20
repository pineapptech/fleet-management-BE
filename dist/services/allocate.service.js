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
exports.AllocateVehicleService = void 0;
const allocate_model_1 = __importDefault(require("../models/allocate.model"));
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
class AllocateVehicleService {
    constructor() {
        this.allocateVehicleService = (file, otherData) => __awaiter(this, void 0, void 0, function* () {
            if (!file) {
                throw new Error('Please provide the image of the recipient.');
            }
            if (!otherData) {
                throw new Error('Each field is required.');
            }
            const allocate = yield new Promise((resolve, reject) => {
                const stream = cloudinary_config_1.default.uploader.upload_stream({ folder: 'allocate' }, (err, data) => {
                    if (err) {
                        console.error('Cloudinary upload error:', err); // Log actual Cloudinary error
                        reject(new Error(`Cloudinary error: ${err.message}`));
                    }
                    else {
                        console.log('Cloudinary upload successful:', data); // Log success response
                        resolve(data);
                    }
                });
                if (!file.buffer) {
                    console.error('File buffer is empty');
                    reject(new Error('File buffer is empty or invalid'));
                }
                stream.end(file.buffer);
            });
            const allocated = yield allocate_model_1.default.create(Object.assign(Object.assign({}, otherData), { recipient_img_id: allocate.secure_url }));
            return allocated; // Return the created record
        });
    }
}
exports.AllocateVehicleService = AllocateVehicleService;
