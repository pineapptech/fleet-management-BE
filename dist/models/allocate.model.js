"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const allocateSchema = new mongoose_1.Schema({
    vehicle_id: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
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
    vehicle_color: {
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
    name_of_recipient: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    position_of_recipient: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    date_of_allocation: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    recipient_contact: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    recipient_id_type: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    recipient_img_id: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    vehicle_status: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    vehicle_particulars_status: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    },
    responsible_officer: {
        type: String,
        trim: true,
        required: [true, '{PATH} is required']
    }
});
const Allocate = (0, mongoose_1.model)('allocate', allocateSchema);
exports.default = Allocate;
