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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllocateUploadController = void 0;
const allocate_service_1 = require("../services/allocate.service");
class AllocateUploadController {
    constructor() {
        this.upload = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    res.status(400).json({
                        status: false,
                        message: 'No file to Upload'
                    });
                    return;
                }
                const data = req.body;
                if (!data) {
                    res.status(404).json({
                        status: false,
                        message: 'All Fields are required'
                    });
                    return;
                }
                const result = yield this.allocateUploadService.uploadFile(req.file, data);
                res.status(201).json({
                    status: true,
                    message: 'Vehicle successfully allocated'
                });
            }
            catch (error) {
                res.status(500).json({
                    status: false,
                    message: 'Error while allocating Vehicle',
                    details: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getAllocatedVehicle = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const uploads = yield this.allocateUploadService.getAllocateVehicle();
                if (uploads.length === 0) {
                    res.status(404).json({
                        status: false,
                        message: 'No Vehicle have been allocated..'
                    });
                    return;
                }
                res.status(200).json({
                    status: true,
                    length: uploads.length,
                    data: uploads
                });
            }
            catch (error) {
                res.status(500).json({
                    error: 'Failed to fetch uploads',
                    details: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.allocateUploadService = new allocate_service_1.AllocateUploadService();
    }
}
exports.AllocateUploadController = AllocateUploadController;
