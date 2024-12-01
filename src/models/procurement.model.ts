import { model, Schema } from 'mongoose';
import IProcurement from '../interfaces/procurement.interface';

const procurementSchema = new Schema<IProcurement>(
    {
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
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Procurement = model<IProcurement>('procurement', procurementSchema);
export default Procurement;
