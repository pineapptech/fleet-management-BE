import { Document } from 'mongoose';

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
}

export default IOrganization;
