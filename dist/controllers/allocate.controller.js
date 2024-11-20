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
const allocate_service_1 = require("../services/allocate.service");
class AllocateVehicleController {
    constructor() {
        this.allocateVehicle = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Extract the file and otherData from the request
                const file = req.file;
                const otherData = req.body;
                // Validate file existence
                if (!file || !file.buffer) {
                    res.status(400).json({ message: 'File buffer is empty or file not provided.' });
                    return;
                }
                // Call the service to allocate the vehicle
                const allocated = yield this.allocateVehicleService.allocateVehicleService({ [file.fieldname]: file }, otherData);
                res.status(201).json({
                    message: 'Vehicle allocation successful.',
                    data: allocated.recipient_id_type
                });
                return;
            }
            catch (error) {
                console.error('Error in allocateVehicle:', error);
                res.status(500).json({
                    message: 'Failed to allocate vehicle.',
                    error: error.message
                });
            }
        });
        this.allocateVehicleService = new allocate_service_1.AllocateVehicleService();
    }
}
exports.default = AllocateVehicleController;
