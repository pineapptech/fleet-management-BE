import IMaintenance from "../interfaces/maintenance.interface";
import { Schema, model } from 'mongoose';

const maintenanceSchema = new Schema<IMaintenance>({
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
},{
    timestamps: true, 
    versionKey: false,
});

const Maintenance = model<IMaintenance>('Maintenance', maintenanceSchema)
export default Maintenance;