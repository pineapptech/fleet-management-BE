import { v2 as cloudinary } from 'cloudinary';
import Vehicle from '../models/vehicle.model';
import IVehicle from '../interfaces/vehicle.interface';
import { configDotenv } from 'dotenv';
import { generateVehicleID } from '../utils/generateVehicleID';
import { NotFoundError, ValidationError } from '../error/CustomError';
import mongoose from 'mongoose';
configDotenv();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string
});

export class VehicleService {
    // Helper function to validate files
    private validateFiles(files: { [fieldname: string]: Express.Multer.File[] } | undefined) {
        if (!files || !files.vehicle_img || !files.vehicle_img[0]) {
            throw new Error('Vehicle image file is missing');
        }
        if (!files.procurement_img || !files.procurement_img[0]) {
            throw new Error('Procurement image file is missing');
        }
    }

    // Helper function to wrap cloudinary upload_stream in a Promise
    private async uploadToCloudinary(fileBuffer: Buffer, folder: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result?.secure_url || ''); // Resolve with secure_url if available
                }
            });
            stream.end(fileBuffer);
        });
    }

    public async uploadVehicleData(files: { [fieldname: string]: Express.Multer.File[] }, vehicleData: Partial<IVehicle>) {
        try {
            // Validate files before proceeding
            this.validateFiles(files);

            if (!vehicleData) {
                throw new Error('All othr Vehicle Data are needed...');
            }

            // Upload images to Cloudinary
            const vehicleImgUrl = await this.uploadToCloudinary(files.vehicle_img[0].buffer, 'vehicle_img');
            const procurementImgUrl = await this.uploadToCloudinary(files.procurement_img[0].buffer, 'procurement_img');

            const vehicle_id = generateVehicleID();
            // Create a new vehicle entry
            const vehicle = await Vehicle.create({
                image: vehicleImgUrl,
                procurement_img: procurementImgUrl,
                vehicle_id,
                ...vehicleData
            });

            return vehicle;
        } catch (error: any) {
            // console.error('Error in uploading vehicle data:', error);
            throw new Error(`${error.message}`);
        }
    }

    public getVehicles = async (): Promise<IVehicle[]> => {
        try {
            const vehicles = await Vehicle.find();
            return vehicles;
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    };

    public updateVehicle = async (updatedData: Partial<IVehicle>, vehicleId: string): Promise<IVehicle | null> => {
        if (!vehicleId) {
            throw new ValidationError('Vehicle ID is required for this operation');
        }

        const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, updatedData, {
            new: true,
            runValidators: true
        });

        if (!vehicle) {
            throw new NotFoundError('Vehicle not found');
        }
        return vehicle;
    };

    public getVehicle = async (vehicleId: string): Promise<IVehicle | null> => {
        if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
            throw new Error(`Invalid ID format: ${vehicleId}`);
        }

        if (!vehicleId) {
            throw new ValidationError('Vehicle ID is Required');
        }

        const vehicle = await Vehicle.findById({ _id: vehicleId });

        if (!vehicle) {
            throw new NotFoundError('Vehicle not found');
        }
        return vehicle;
    };

    public deleteVehicle = async (vehicleId: string): Promise<boolean> => {
        if (!vehicleId) {
            throw new ValidationError('Vehicle ID is Required');
        }

        const vehicle = await Vehicle.findByIdAndDelete(vehicleId);

        if (!vehicle) {
            throw new NotFoundError('Vehicle not found');
        }
        return true;
    };
}
