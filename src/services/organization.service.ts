import cloudinary from '../config/cloudinary.config';
import IOrganization from '../interfaces/organization.interface';
import fs from 'fs';
import Organization from '../models/organization.model';

class OrganizationService {
    public createSerivce = async (file: Express.Multer.File, organization: Partial<IOrganization>): Promise<IOrganization> => {
        console.log(file);

        try {
            const result = await cloudinary.uploader.upload(file.path, { folder: 'organization' });
            fs.unlinkSync(file.path);
            const upload = await Organization.create({
                ...organization,
                logoImgUrl: result.secure_url
            });
            return upload;
        } catch (error) {
            if (file.path && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
            throw error;
        }
    };
}

export default new OrganizationService();
