import { Document } from 'mongoose';

interface IVehicle extends Document {
    image: string;
    procurement_img: string;
    vehicle_id: string;
    plate_number: string;
    vehicle_type: string;
    vehicle_model: string;
    engine_number: string;
    date_of_procurement: string;
    date_of_delivery: string;
    procurement_source: string;
    assigned_to_under_review?: string;
    date_of_assignment: string;
    responsible_officer: string;
    vehicle_status: string;
}

export default IVehicle;
