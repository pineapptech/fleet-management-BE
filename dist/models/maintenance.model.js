"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const maintenanceSchema = new mongoose_1.Schema({
    vehicle_id: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    type_of_maintenance: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    description_maintenance: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    maintenance_cost: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    milage: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    maintenance_provider: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    invoice_img_url: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    }
}, {
    timestamps: true,
    versionKey: false,
});
const Maintenance = (0, mongoose_1.model)('Maintenance', maintenanceSchema);
exports.default = Maintenance;
