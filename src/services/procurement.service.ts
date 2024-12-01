import IProcurement from '../interfaces/procurement.interface';
import Procurement from '../models/procurement.model';
import { generateRandom } from '../utils/generateVehicleID';

export class ProcurementService {
    public createProcurement = async (date: Date, data: Partial<IProcurement>): Promise<IProcurement> => {
        try {
            const orderNumber = generateRandom('ORD');
            const procurement = await Procurement.create({
                orderNumber,
                deliveryDate: date,
                ...data
            });
            return procurement;
        } catch (error) {
            throw error;
        }
    };

    public getAllProcurements = async (): Promise<IProcurement[]> => {
        try {
            const procurement = await Procurement.find();
            return procurement;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    public getProcurement = async (procurementId: string): Promise<IProcurement | null> => {
        try {
            const procurement = await Procurement.findById({ _id: procurementId });
            return procurement;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    // public updateProcurement = async (updatedData:IProcurement, procurementId: string): Promise<IProcurement> => {
    //     try {
    //         const procurement = await Procurement.findByIdAndUpdate({_id: procurementId})
    //     } catch (error) {

    //     }
    // }
}
