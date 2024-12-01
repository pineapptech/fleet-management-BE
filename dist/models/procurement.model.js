"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const procurementSchema = new mongoose_1.Schema({
    orderNumber: {
        type: String,
        trim: true
    },
    procurementType: {
        type: String,
        trim: true,
        required: [true, '{PATH} is Required']
    },
    vendorName: {
        type: String,
        trim: true,
        required: [true, '{PATH} is Required']
    },
    description: {
        type: String,
        trim: true,
        required: [true, '{PATH} is Required']
    },
    quantity: {
        type: Number,
        trim: true,
        required: [true, '{PATH} is Required']
    },
    deliveryDate: {
        type: Date
    },
    budget: {
        type: Number,
        trim: true,
        required: [true, '{PATH} is Required']
    },
    priorityLevel: {
        type: String,
        trim: true,
        required: [true, '{PATH} is Required']
    }
}, {
    timestamps: true,
    versionKey: false
});
const Procurement = (0, mongoose_1.model)('procurement', procurementSchema);
exports.default = Procurement;
