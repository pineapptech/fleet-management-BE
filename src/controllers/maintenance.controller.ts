import { Request, Response } from 'express';
import MaintenanceService from '../services/maintenance.service';

class MaintenanceController {
    private maintenanceService: MaintenanceService;

    constructor() {
        this.maintenanceService = new MaintenanceService();
    }

    public createMaintenance = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.file) {
                res.status(400).json({
                    status: false,
                    message: 'No file to Upload'
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
            const result = await this.maintenanceService.createMaintenance(req.file, data);
            res.status(201).json({
                status: false,
                message: 'Maintenance Record created successfully',
                data: result.vehicle_id
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Error while Creating Maintenance Record',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    public getAllMaintenedVehicles = async (req: Request, res: Response): Promise<void> => {
        try {
            const allMaintenedVehicles = await this.maintenanceService.getVehicleMaintenance();
            if (allMaintenedVehicles.length === 0) {
                res.status(404).json({
                    status: false,
                    message: 'No Record of Maintained Vehicle Found...'
                });
                return;
            }
            res.status(200).json({
                status: true,
                length: allMaintenedVehicles.length,
                data: allMaintenedVehicles
            });
        } catch (error: any) {
            res.status(500).json({
                status: false,
                message: error.message,
                stack: process.env.NODE_ENV !== 'production' ? JSON.stringify(error.stack) : ''
            });
        }
    };

    public getVehicleMaintenanceById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const vehicle = await this.maintenanceService.getVehicleMaintenanceById(id);
            if (!vehicle) {
                res.status(404).json({
                    status: false,
                    message: 'Vehicle with the specified ID not found'
                });
                return;
            }
            res.status(200).json({
                status: true,
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

    public updateVehicleMaintenance = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedVehicle = await this.maintenanceService.updateVehicleMaintenance(id, data);
            if (!updatedVehicle) {
                res.status(404).json({
                    status: false,
                    message: 'Vehicle with the specified ID not found'
                });
                return;
            }
            res.status(200).json({
                status: true,
                message: 'Vehicle Maintenance Record Updated Successfully',
                data: updatedVehicle
            });
        } catch (error: any) {
            res.status(500).json({
                status: false,
                message: error.message,
                stack: process.env.NODE_ENV !== 'production' ? JSON.stringify(error.stack) : ''
            });
        }
    };

    public deleteVehicleMaintenance = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const deletedVehicle = await this.maintenanceService.deleteVehicleMaintenance(id);
            if (!deletedVehicle) {
                res.status(404).json({
                    status: false,
                    message: 'Vehicle with the specified ID not found'
                });
                return;
            }
            res.status(200).json({
                status: true,
                message: 'Vehicle Maintenance Record Deleted Successfully',
                data: deletedVehicle
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

export default new MaintenanceController();
