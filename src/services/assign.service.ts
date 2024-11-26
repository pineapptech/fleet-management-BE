import cloudinary from '../config/cloudinary.config';
import IAssign from '../interfaces/assign.interface';
import fs from 'fs';
import Assign from '../models/assign.model';

export class AssignService {
    public async uploadFile(file: Express.Multer.File, data: Partial<IAssign>): Promise<IAssign> {
        console.log(file);

        try {
            const result = await cloudinary.uploader.upload(file.path, { folder: 'assigned' });
            fs.unlinkSync(file.path);
            const upload = await Assign.create({
                ...data,
                driver_img_url: result.secure_url
            });
            return upload;
        } catch (error) {
            if (file.path && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
            throw error;
        }
    }

    public async getAllAssignedVehicles(): Promise<IAssign[]> {
        return await Assign.find();
    }
}
