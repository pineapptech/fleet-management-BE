import { Schema, model } from 'mongoose';
import IOrganization from '../interfaces/organization.interface';

const organizationSchema = new Schema<IOrganization>({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    logoImgUrl: {
        type: String,
        trim: true,
        required: true
    },
    adminFullName: {
        type: String,
        trim: true,
        required: true
    },
    addminEmail: {
        type: String,
        trim: true,
        required: true
    },
    addminRole: {
        type: String,
        trim: true,
        required: true
    },
    adminPhone: {
        type: String,
        trim: true,
        required: true
    },
    numberOfVehicles: {
        type: Number,
        trim: true,
        required: true
    },
    operationalAreas: {
        type: [String],
        required: true
    },
    vehilceCategories: {
        type: String,
        required: true
    }
});

const Organization = model<IOrganization>('organization', organizationSchema);
export default Organization;
