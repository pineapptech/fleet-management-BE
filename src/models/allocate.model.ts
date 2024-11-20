import { Schema, model } from 'mongoose';
import IAllocate from '../interfaces/allocate.interface';

const allocateSchema = new Schema<IAllocate>({
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

const Allocate = model<IAllocate>('allocate', allocateSchema);
export default Allocate;
