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
exports.ProcurementController = void 0;
const user_validation_utils_1 = require("../utils/user-validation.utils");
class ProcurementController {
    constructor(procurementService) {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const validationData = user_validation_utils_1.UserValidation.validate(req.body, user_validation_utils_1.UserValidation.procurementSchema);
                let deliveryDate;
                if (validationData.deliveryDate) {
                    // Try multiple parsing strategies
                    deliveryDate = new Date(validationData.deliveryDate);
                    // Validate the date
                    if (isNaN(deliveryDate.getTime())) {
                        throw new Error('Invalid delivery date');
                    }
                }
                else {
                    // Fallback to current date if no date provided
                    deliveryDate = new Date();
                }
                const procurement = yield this.procurementService.createProcurement(deliveryDate, validationData);
                if (!procurement) {
                    res.status(400).json({
                        status: false,
                        message: 'Procurement creation failed'
                    });
                    return;
                }
                res.status(201).json({
                    status: true,
                    message: 'Procurement created successfully',
                    data: procurement
                });
            }
            catch (error) {
                if (error instanceof user_validation_utils_1.ValidationError) {
                    res.status(400).json({
                        message: 'Validation Failed',
                        errors: error.errors
                    });
                    return;
                }
                console.error(error);
                res.status(500).json({
                    message: 'Internal server error',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.procurementService = procurementService;
    }
}
exports.ProcurementController = ProcurementController;
