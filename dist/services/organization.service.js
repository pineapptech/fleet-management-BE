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
const organization_model_1 = __importDefault(require("../models/organization.model"));
const mongoose_1 = require("mongoose");
class OrganizationService {
    constructor() {
        this.createService = (file, organization, userId) => __awaiter(this, void 0, void 0, function* () {
            console.log(file);
            try {
                // Upload logo to Cloudinary
                const result = yield cloudinary_config_1.default.uploader.upload(file.path, { folder: 'organization' });
                // Remove temporary file
                fs_1.default.unlinkSync(file.path);
                // Create organization with createdBy field
                const upload = yield organization_model_1.default.create(Object.assign(Object.assign({}, organization), { logoImgUrl: result.secure_url, createdBy: new mongoose_1.Types.ObjectId(userId) // Convert userId to MongoDB ObjectId
                 }));
                return upload;
            }
            catch (error) {
                // Clean up file if upload fails
                if (file.path && fs_1.default.existsSync(file.path)) {
                    fs_1.default.unlinkSync(file.path);
                }
                throw error;
            }
        });
        // Optional: Add method to get organizations created by a user
        this.getOrganizationsByUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield organization_model_1.default.findOne({ createdBy: userId }).populate('createdBy', 'name email'); // Optional: populate creator details
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new OrganizationService();
