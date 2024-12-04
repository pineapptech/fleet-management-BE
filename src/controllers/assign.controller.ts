import { NotFoundError, ValidationError } from '../error/CustomError';
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

    public getAssignedVehicle = async (req: Request, res: Response): Promise<void> => {
        try {
            const vehicle = await this.assignService.getAssignedVehicle(req.params.id);
            if (!vehicle) {
                res.status(401).json({
                    status: false,
                    message: 'Failed to get vehicle'
                });
            }
            res.status(200).json({
                status: true,
                data: vehicle
            });
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({
                    status: false,
                    message: error.message
                });
                return;
            }

            if (error instanceof NotFoundError) {
                res.status(404).json({
                    status: false,
                    message: error.message
                });
                return;
            }

            // Log unexpected errors
            console.error(error);

            res.status(500).json({
                status: false,
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    public updateAssignedVehilce = async (req: Request, res: Response): Promise<void> => {
        try {
            const vehicle = await this.assignService.updateAssignVehicle(req.body, req.params.id);
            if (!vehicle) {
                res.status(400).json({
                    status: false,
                    message: 'Vehicle Assigned failed to update'
                });
                return;
            }
            res.status(200).json({
                status: true,
                message: 'Vehicle Assigned has been Updated successfully',
                data: vehicle
            });
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({
                    status: false,
                    message: error.message
                });
                return;
            }

            if (error instanceof NotFoundError) {
                res.status(404).json({
                    status: false,
                    message: error.message
                });
                return;
            }

            // Log unexpected errors
            console.error(error);

            res.status(500).json({
                status: false,
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    public deleteAssinedVehilce = async (req: Request, res: Response): Promise<void> => {
        try {
            const vehicle = await this.assignService.deleteVehicle(req.params.id);
            if (!vehicle) {
                res.status(400).json({
                    status: false,
                    message: 'Vehicle Failed to be deleted'
                });
            }
            res.status(200).json({
                status: true,
                message: 'Vehicle successfully deleted'
            });
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({
                    status: false,
                    message: error.message
                });
                return;
            }

            if (error instanceof NotFoundError) {
                res.status(404).json({
                    status: false,
                    message: error.message
                });
                return;
            }

            // Log unexpected errors
            console.error(error);

            res.status(500).json({
                status: false,
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}

export default new AssignController();
