import { Request, Response, NextFunction } from 'express';
import { VehicleService } from '../services/vehicle.service';
import multipleUpload from '../middlewares/image.middleware' 

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
}
