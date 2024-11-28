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
class OrganizationService {
    constructor() {
        this.createSerivce = (file, organization) => __awaiter(this, void 0, void 0, function* () {
            console.log(file);
            try {
                const result = yield cloudinary_config_1.default.uploader.upload(file.path, { folder: 'organization' });
                fs_1.default.unlinkSync(file.path);
                const upload = yield organization_model_1.default.create(Object.assign(Object.assign({}, organization), { logoImgUrl: result.secure_url }));
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
}
exports.default = new OrganizationService();
