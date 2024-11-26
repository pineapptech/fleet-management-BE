import { Document } from 'mongoose';
import { BaseAllocation } from './base.interface';

interface IAllocate extends BaseAllocation, Document {
    name_of_recipient: string;
    position_of_recipient: string;
    date_of_allocation: string;
    recipient_contact: string;
    recipient_id_type: string;
    recipient_img_id: string; // image url
    vehicle_status: string;
    vehicle_particulars_status: string;
}
export default IAllocate;
