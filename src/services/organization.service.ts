import cloudinary from '../config/cloudinary.config';
import IOrganization from '../interfaces/organization.interface';
import fs from 'fs';
import Organization from '../models/organization.model';
import { Types } from 'mongoose';

class OrganizationService {
    public createService = async (file: Express.Multer.File, organization: Partial<IOrganization>, userId: string): Promise<IOrganization> => {
        console.log(file);
        try {
            // Upload logo to Cloudinary
            const result = await cloudinary.uploader.upload(file.path, { folder: 'organization' });

            // Remove temporary file
            fs.unlinkSync(file.path);

            // Create organization with createdBy field
            const upload = await Organization.create({
                ...organization,
                logoImgUrl: result.secure_url,
                createdBy: new Types.ObjectId(userId) // Convert userId to MongoDB ObjectId
            });

            return upload;
        } catch (error) {
            // Clean up file if upload fails
            if (file.path && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
            throw error;
        }
    };

    // Optional: Add method to get organizations created by a user
    public getOrganizationsByUser = async (userId: string): Promise<IOrganization[]> => {
        try {
            return await Organization.find({ createdBy: userId }).populate('createdBy', 'name email'); // Optional: populate creator details
        } catch (error) {
            throw error;
        }
    };
}

export default new OrganizationService();
