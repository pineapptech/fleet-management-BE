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
const CustomError_1 = require("../error/CustomError");
const assign_service_1 = require("./../services/assign.service");
class AssignController {
    constructor() {
        this.assignVehicle = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    res.status(400).json({
                        status: false,
                        message: 'No Image to Identify the Driver, Kindly upload and try again...'
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
                const result = yield this.assignService.uploadFile(req.file, data);
                if (!result) {
                    res.status(400).json({
                        status: false,
                        message: 'Failed to Assign Vehicle to the Driver Please try again...'
                    });
                    return;
                }
                res.status(201).json({
                    status: true,
                    message: 'Vehicle Successfully Assinged to the Driver...'
                });
            }
            catch (error) {
                res.status(500).json({
                    status: false,
                    message: 'Error while Assigning Vehicle',
                    details: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getAllAssignedVehicles = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const assignedVehicles = yield this.assignService.getAllAssignedVehicles();
                if (assignedVehicles.length === 0) {
                    res.status(404).json({
                        status: false,
                        message: 'No Vehicle has Been Assigned Yet...'
                    });
                    return;
                }
                res.status(200).json({
                    status: true,
                    length: assignedVehicles.length,
                    data: assignedVehicles
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
        this.getAssignedVehicle = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicle = yield this.assignService.getAssignedVehicle(req.params.id);
                if (!vehicle) {
                    res.status(401).json({
                        status: false,
                        message: 'Failed to get vehicle'
                    });
                }
                res.status(200).json({
                    status: true,
                    data: vehicle
                });
            }
            catch (error) {
                if (error instanceof CustomError_1.ValidationError) {
                    res.status(400).json({
                        status: false,
                        message: error.message
                    });
                    return;
                }
                if (error instanceof CustomError_1.NotFoundError) {
                    res.status(404).json({
                        status: false,
                        message: error.message
                    });
                    return;
                }
                // Log unexpected errors
                console.error(error);
                res.status(500).json({
                    status: false,
                    message: 'Internal server error',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.updateAssignedVehilce = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicle = yield this.assignService.updateAssignVehicle(req.body, req.params.id);
                if (!vehicle) {
                    res.status(400).json({
                        status: false,
                        message: 'Vehicle Assigned failed to update'
                    });
                    return;
                }
                res.status(200).json({
                    status: true,
                    message: 'Vehicle Assigned has been Updated successfully',
                    data: vehicle
                });
            }
            catch (error) {
                if (error instanceof CustomError_1.ValidationError) {
                    res.status(400).json({
                        status: false,
                        message: error.message
                    });
                    return;
                }
                if (error instanceof CustomError_1.NotFoundError) {
                    res.status(404).json({
                        status: false,
                        message: error.message
                    });
                    return;
                }
                // Log unexpected errors
                console.error(error);
                res.status(500).json({
                    status: false,
                    message: 'Internal server error',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.deleteAssinedVehilce = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicle = yield this.assignService.deleteVehicle(req.params.id);
                if (!vehicle) {
                    res.status(400).json({
                        status: false,
                        message: 'Vehicle Failed to be deleted'
                    });
                }
                res.status(200).json({
                    status: true,
                    message: 'Vehicle successfully deleted'
                });
            }
            catch (error) {
                if (error instanceof CustomError_1.ValidationError) {
                    res.status(400).json({
                        status: false,
                        message: error.message
                    });
                    return;
                }
                if (error instanceof CustomError_1.NotFoundError) {
                    res.status(404).json({
                        status: false,
                        message: error.message
                    });
                    return;
                }
                // Log unexpected errors
                console.error(error);
                res.status(500).json({
                    status: false,
                    message: 'Internal server error',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.assignService = new assign_service_1.AssignService();
    }
}
exports.default = new AssignController();
