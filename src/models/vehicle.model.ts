import { Schema, model } from "mongoose";
import IVehicle from "../interfaces/vehicle.interface";

const vehicleSchema = new Schema<IVehicle>({
    image: {
        type: String,
        trim: true
    },
    procurement_img: {
        type: String,
        trim: true
    },
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

const Vehicle = model<IVehicle>('vehicle', vehicleSchema)
export default Vehicle

