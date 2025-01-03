import cloudinary from '../config/cloudinary.config';
import IMaintenance from '../interfaces/maintenance.interface';
import fs from 'fs';
import Maintenance from '../models/maintenance.model';
import { generateVehicleID } from '../utils/generateVehicleID';
class MaintenanceService {
    public createMaintenance = async (file: Express.Multer.File, data: Partial<IMaintenance>): Promise<IMaintenance> => {
        try {
            const result = await cloudinary.uploader.upload(file.path, { folder: 'maintenance' });
            process.env.NODE_ENV !== 'production' ? console.log(result) : '';
            fs.unlinkSync(file.path);

            const vehicle_id = generateVehicleID();
            console.log(vehicle_id);

            const upload = Maintenance.create({
                vehicle_id,
                ...data,
                invoice_img_url: result.secure_url
            });

            return upload;
        } catch (error) {
            if (file.path && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
            throw error;
        }
    };

    public getVehicleMaintenance = async (): Promise<IMaintenance[]> => {
        try {
            const maintainedVehicle = await Maintenance.find();
            return maintainedVehicle;
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    };

    public getVehicleMaintenanceById = async (id: string): Promise<IMaintenance | null> => {
        try {
            const maintainedVehicle = await Maintenance.findById(id);
            return maintainedVehicle;
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    };

    public updateVehicleMaintenance = async (id: string, data: Partial<IMaintenance>): Promise<IMaintenance | null> => {
        try {
            const updatedVehicle = await Maintenance.findByIdAndUpdate(id, data, { new: true });
            return updatedVehicle;
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    };

    public deleteVehicleMaintenance = async (id: string): Promise<IMaintenance | null> => {
        try {
            const deletedVehicle = await Maintenance.findByIdAndDelete(id);
            return deletedVehicle;
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    };
}

export default MaintenanceService;
