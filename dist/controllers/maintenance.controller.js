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
const maintenance_service_1 = __importDefault(require("../services/maintenance.service"));
class MaintenanceController {
    constructor() {
        this.createMaintenance = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.maintenanceService.createMaintenance(req.file, data);
                res.status(201).json({
                    status: false,
                    message: 'Maintenance Record created successfully',
                    data: result.vehicle_id
                });
            }
            catch (error) {
                res.status(500).json({
                    status: false,
                    message: 'Error while Creating Maintenance Record',
                    details: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getAllMaintenedVehicles = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allMaintenedVehicles = yield this.maintenanceService.getVehicleMaintenence();
                if (allMaintenedVehicles.length === 0) {
                    res.status(404).json({
                        status: false,
                        message: 'No Record of Maintained Vehicle Found...'
                    });
                    return;
                }
                res.status(200).json({
                    status: true,
                    length: allMaintenedVehicles.length,
                    data: allMaintenedVehicles
                });
            }
            catch (error) {
                res.status(500).json({
                    status: false,
                    message: error.message,
                    stack: process.env.NODE_ENV !== 'production' ? JSON.stringify(error.stack) : ''
                });
            }
        });
        this.maintenanceService = new maintenance_service_1.default();
    }
}
exports.default = new MaintenanceController();
