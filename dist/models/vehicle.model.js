"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const vehicleSchema = new mongoose_1.Schema({
    image: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    procurement_img: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    vehicle_id: {
        // generated programatically
        type: String,
        trim: true
    },
    plate_number: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    vehicle_type: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    vehicle_model: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    engine_number: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    date_of_procurement: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    date_of_delivery: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    procurement_source: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    assigned_to_under_review: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    date_of_assignment: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    responsible_officer: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    vehicle_status: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    }
}, {
    timestamps: true,
    versionKey: false
});
const Vehicle = (0, mongoose_1.model)('vehicle', vehicleSchema);
exports.default = Vehicle;
