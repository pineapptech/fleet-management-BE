"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const assignSchema = new mongoose_1.Schema({
    name_of_driver: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    driver_position: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    date_of_assignment: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    driver_contact: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    driver_id_type: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    driver_img_url: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    vehicle_status: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    date_of_order: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    start_location: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    approved_destination: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    approved_allowance: {
        type: Number,
        trim: true,
        required: [true, '{PATH} is required']
    }
}, {
    timestamps: true,
    versionKey: false
});
const Assign = (0, mongoose_1.model)('assign', assignSchema);
exports.default = Assign;
