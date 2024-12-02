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
exports.ProcurementService = void 0;
const procurement_model_1 = __importDefault(require("../models/procurement.model"));
const generateVehicleID_1 = require("../utils/generateVehicleID");
class ProcurementService {
    constructor() {
        this.createProcurement = (date, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const orderNumber = (0, generateVehicleID_1.generateRandom)('ORD');
                const procurement = yield procurement_model_1.default.create(Object.assign({ orderNumber, deliveryDate: date }, data));
                return procurement;
            }
            catch (error) {
                throw error;
            }
        });
        this.getAllProcurements = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const procurement = yield procurement_model_1.default.find();
                return procurement;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getProcurement = (procurementId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const procurement = yield procurement_model_1.default.findById({ _id: procurementId });
                return procurement;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.updateProcurement = (updatedData, procurementId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const procurement = yield procurement_model_1.default.findByIdAndUpdate(procurementId, updatedData, {
                    new: true,
                    runValidators: true
                });
                if (!procurement) {
                    throw new Error(`Could not find the Procurement`);
                }
                return procurement;
            }
            catch (error) {
                process.env.NODE_ENV !== 'production' ? console.error('Error updating procurement:', error) : '';
                throw error;
            }
        });
    }
}
exports.ProcurementService = ProcurementService;
