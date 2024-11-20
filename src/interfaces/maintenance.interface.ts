import { Document } from "mongoose";

interface IMaintenance extends Document{
    vehicle_id: string;
    date: string;
    type_of_maintenance: string;
    description_maintenance: string;
    maintenance_cost: string;
    milage: string;
    maintenance_provider: string;
    invoice_img_url: string;
}

export default IMaintenance