import cloudinary from "../config/cloudinary.config";
import IAllocate from "../interfaces/allocate.interface";
import fs from 'fs'
import Allocate from "../models/allocate.model";

export class AllocateUploadService {

    public async uploadFile(file: Express.Multer.File, data: Partial<IAllocate>): Promise<IAllocate> { 
        console.log(file);
        
        try {
            const result = await cloudinary.uploader.upload(file.path)

            fs.unlinkSync(file.path)
            const upload = await Allocate.create({
                ...data,
                recipient_img_id: result.secure_url
            });

            return upload
        } catch (error) {
            if (file.path && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path)
            }
            throw error
        }
    }

    public async getAllocateVehicle(): Promise<IAllocate[]>{
        return await Allocate.find()
    }
}