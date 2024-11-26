import { Document } from 'mongoose';
import { BaseAllocation } from './base.interface';

interface IAssign extends BaseAllocation, Document {
    name_of_driver: string;
    driver_position: string;
    date_of_assignment: string;
    driver_contact: string;
    driver_id_type: string;
    driver_img_url: string;
    vehicle_status: string;
    date_of_order: string;
    start_location: string;
    approved_destination: string;
    approved_allowance: number;
}

export default IAssign;
