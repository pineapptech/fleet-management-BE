"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.eventValidationSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(255).required(),
    description: joi_1.default.string().min(10).required(),
    date: joi_1.default.date().iso().required(),
    location: joi_1.default.string().min(3).max(255).required(),
    price: joi_1.default.number().min(0).precision(2).required(),
    ticketType: joi_1.default.string().valid('BASIC', 'VIP').required()
});
