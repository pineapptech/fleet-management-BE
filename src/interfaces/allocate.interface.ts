import { Document } from "mongoose";

interface IAllocate extends Document{
    vehicle_id: string;
    plate_number: string;
    vehicle_type: string;
    vehicle_color: string;
    vehicle_model: string;
    engine_number: string;
    name_of_recipient: string;
    position_of_recipient: string;
    date_of_allocation: string;
    recipient_contact: string;
    recipient_id_type: string;
    recipient_img_id: string; // image url
    vehicle_status: string;
    vehicle_particulars_status: string;
    responsible_officer: string;
}

export default IAllocate