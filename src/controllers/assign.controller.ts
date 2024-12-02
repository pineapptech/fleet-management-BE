import { AssignService } from './../services/assign.service';
import { Request, Response } from 'express';

interface CustomRequest extends Request {
    file?: Express.Multer.File;
}
class AssignController {
    private assignService: AssignService;

    constructor() {
        this.assignService = new AssignService();
    }

    public assignVehicle = async (req: CustomRequest, res: Response): Promise<void> => {
        try {
            if (!req.file) {
                res.status(400).json({
                    status: false,
                    message: 'No Image to Identify the Driver, Kindly upload and try again...'
                });
                return;
            }

            const data = req.body;
            if (!data) {
                res.status(404).json({
                    status: false,
                    message: 'All Fields are required'
                });
                return;
            }
            const result = await this.assignService.uploadFile(req.file, data);
            if (!result) {
                res.status(400).json({
                    status: false,
                    message: 'Failed to Assign Vehicle to the Driver Please try again...'
                });
                return;
            }
            res.status(201).json({
                status: true,
                message: 'Vehicle Successfully Assinged to the Driver...'
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Error while Assigning Vehicle',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    public getAllAssignedVehicles = async (req: Request, res: Response): Promise<void> => {
        try {
            const assignedVehicles = await this.assignService.getAllAssignedVehicles();
            if (assignedVehicles.length === 0) {
                res.status(404).json({
                    status: false,
                    message: 'No Vehicle has Been Assigned Yet...'
                });
                return;
            }
            res.status(200).json({
                status: true,
                length: assignedVehicles.length,
                data: assignedVehicles
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

export default new AssignController();
