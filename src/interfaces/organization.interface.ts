import { Document, Types } from 'mongoose';

interface IOrganization extends Document {
    name: string;
    email: string;
    type: string;
    phone: string;
    logoImgUrl: string;
    adminFullName: string;
    addminEmail: string;
    addminRole: string;
    adminPhone: string;
    numberOfVehicles: number;
    operationalAreas: string[];
    vehilceCategories: string;
    createdBy: Types.ObjectId;
}

export default IOrganization;
