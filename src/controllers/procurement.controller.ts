import { Request, Response } from 'express';
import IProcurement from '../interfaces/procurement.interface';
import { ProcurementService } from '../services/procurement.service';
import { UserValidation, ValidationError } from '../utils/user-validation.utils';

export class ProcurementController {
    procurementService: ProcurementService;

    constructor(procurementService: ProcurementService) {
        this.procurementService = procurementService;
    }

    public create = async (req: Request, res: Response): Promise<void> => {
        try {
            const validationData: IProcurement = UserValidation.validate(req.body, UserValidation.procurementSchema);

            let deliveryDate: Date;
            if (validationData.deliveryDate) {
                // Try multiple parsing strategies
                deliveryDate = new Date(validationData.deliveryDate);

                // Validate the date
                if (isNaN(deliveryDate.getTime())) {
                    throw new Error('Invalid delivery date');
                }
            } else {
                // Fallback to current date if no date provided
                deliveryDate = new Date();
            }

            const procurement = await this.procurementService.createProcurement(deliveryDate, validationData);

            if (!procurement) {
                res.status(400).json({
                    status: false,
                    message: 'Procurement creation failed'
                });
                return;
            }
            res.status(201).json({
                status: true,
                message: 'Procurement created successfully',
                data: procurement
            });
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({
                    message: 'Validation Failed',
                    errors: error.errors
                });
                return;
            }

            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    public getAllProcurements = async (req: Request, res: Response): Promise<void> => {
        try {
            const procurements = await this.procurementService.getAllProcurements();
            if (procurements.length === 0) {
                res.status(200).json({
                    status: false,
                    message: 'No procurements Found...'
                });
                return;
            }

            res.status(200).json({
                status: true,
                data: procurements
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    public getProcurement = async (req: Request, res: Response): Promise<void> => {
        try {
            const procurement = await this.procurementService.getProcurement(req.params.id);

            if (!procurement) {
                res.status(404).json({
                    status: false,
                    message: 'Procurement not found'
                });
                return;
            }

            res.status(200).json({
                status: true,
                data: [procurement]
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    public updateProcurement = async (req: Request, res: Response) => {
        try {
            const procurement = await this.procurementService.updateProcurement(req.body, req.params.id);
            if (!procurement) {
                res.status(404).json({
                    status: false,
                    message: 'Procurement Not Found'
                });
                return;
            }
            res.status(200).json({
                status: true,
                message: 'Procurement Updated Successfully',
                data: procurement
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    public deleteProcurment = async (req: Request, res: Response): Promise<void> => {
        try {
            const procurement = await this.procurementService.deleteProcurement(req.params.id);
            if (!procurement) {
                res.status(404).json({
                    status: false,
                    message: 'Procurement not found'
                });
                return;
            }
            res.status(200).json({
                status: true,
                message: 'Procurement deleted successfully'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}
