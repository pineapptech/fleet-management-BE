import { Request, Response } from "express";
import { AllocateUploadService } from "../services/allocated.service";



interface CustomRequest extends Request {
    file?: Express.Multer.File;
}
export class AllocateUploadController {
    private allocateUploadService: AllocateUploadService;

    constructor() {
        this.allocateUploadService = new AllocateUploadService();
    }

    public upload = async (req: CustomRequest, res: Response): Promise<void> => { 

        try {
            
            if (!req.file) {
                res.status(400).json({
                    status: false,
                    message: 'No file to Upload'
                })
                return
            }

            const data = req.body;
            if (!data) {
                res.status(404).json({
                    status: false,
                    message: 'All Fields are required'
                })  
                return 
            }

            const result = await this.allocateUploadService.uploadFile(req.file!, data);
            res.status(201).json({
                status: true,
                message: 'Vehicle successfully allocated'
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Error while allocating Vehicle',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }


    public getAllocatedVehicle = async (req: Request, res: Response): Promise<void> => { 
        try {
            const uploads = await this.allocateUploadService.getAllocateVehicle();
            res.status(200).json(uploads)
        } catch (error) {
            res.status(500).json({
                error: 'Failed to fetch uploads',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}