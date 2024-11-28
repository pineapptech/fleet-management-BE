import { Request, Response, NextFunction } from 'express';
import { VehicleService } from '../services/vehicle.service';
import multipleUpload from '../middlewares/image.middleware';

export class VehicleController {
    private vehicleService: VehicleService;

    constructor() {
        this.vehicleService = new VehicleService();
    }

    public uploadVehicleData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        // Handle the file upload and validation
        multipleUpload(req, res, async (err) => {
            if (err) {
                return next(err); // Pass any Multer error to the next middleware
            }

            try {
                const files = req.files as { [fieldname: string]: Express.Multer.File[] };
                const vehicleData = req.body;

                // Process the vehicle data and images
                const vehicle = await this.vehicleService.uploadVehicleData(files, vehicleData);

                res.status(201).json({
                    status: true,
                    message: 'Vehicle Data and Images uploaded successfully'
                });
            } catch (error: any) {
                // Handle any errors that occurred during the process
                next(error); // Forward the error to the error handler
            }
        });
    };

    public getVehicles = async (req: Request, res: Response): Promise<void> => {
        try {
            const vehicle = await this.vehicleService.getVehicles();
            if (vehicle.length === 0) {
                res.status(404).json({
                    status: false,
                    message: 'No Vehicle Found, Please upload Vehicle to the Invetory...'
                });
                return;
            }
            res.status(200).json({
                status: true,
                length: vehicle.length,
                data: vehicle
            });
        } catch (error: any) {
            res.status(500).json({
                status: false,
                message: error.message,
                stack: process.env.NODE_ENV !== 'production' ? JSON.stringify(error.stack) : ''
            });
        }
    };
}
