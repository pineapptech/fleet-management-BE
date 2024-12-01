"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrganizationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Organization name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Organization email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Organization type is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    logoImgUrl: {
        type: String,
        default: '' // Optional
    },
    adminFullName: {
        type: String,
        required: [true, 'Admin full name is required']
    },
    addminEmail: {
        type: String,
        required: [true, 'Admin email is required']
    },
    addminRole: {
        type: String,
        required: [true, 'Admin role is required']
    },
    adminPhone: {
        type: String,
        required: [true, 'Admin phone is required']
    },
    numberOfVehicles: {
        type: Number,
        default: 0
    },
    operationalAreas: {
        type: [String],
        default: []
    },
    vehilceCategories: {
        type: String,
        default: ''
    },
    // Add createdBy field with a reference to User model
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User', // Make sure this matches your User model name
        required: [true, 'Creator of the organization is required']
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});
const Organization = mongoose_1.default.model('Organization', OrganizationSchema);
exports.default = Organization;
