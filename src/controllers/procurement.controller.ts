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
}
