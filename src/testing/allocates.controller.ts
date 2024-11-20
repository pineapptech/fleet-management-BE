/* import { NextFunction, Request, Response } from 'express';
import { AllocateVehicleService } from '../src/services/allocates.service';

class AllocateVehicleController {
    private allocateVehicleService: AllocateVehicleService;

    constructor() {
        this.allocateVehicleService = new AllocateVehicleService();
    }

    allocateVehicle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Extract the file and otherData from the request
            const file = req.file;
            const otherData = req.body;

            // Validate file existence
            if (!file || !file.buffer) {
                res.status(400).json({ message: 'File buffer is empty or file not provided.' });
                return;
            }

            // Call the service to allocate the vehicle
            const allocated = await this.allocateVehicleService.allocateVehicleService({ [file.fieldname]: file }, otherData);

            res.status(201).json({
                message: 'Vehicle allocation successful.',
                data: allocated.recipient_id_type
            });
            return;
        } catch (error: unknown | any) {
            console.error('Error in allocateVehicle:', error);
            res.status(500).json({
                message: 'Failed to allocate vehicle.',
                error: error.message
            });
        }
    };
}

export default AllocateVehicleController;
 */