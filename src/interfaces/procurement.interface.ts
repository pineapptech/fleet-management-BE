import { Document } from 'mongoose';

interface IProcurement extends Document {
    orderNumber: string;
    procurementType: string;
    vendorName: string;
    description: string;
    quantity: number;
    deliveryDate: Date;
    budget: number;
    priorityLevel: string;
}

export default IProcurement;
