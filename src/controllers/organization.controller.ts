import { Request, Response } from 'express';
import OrganizationService from '../services/organization.service';

class OrganizationController {
    public createOrganization = async (req: Request, res: Response) => {
        try {
            // Ensure you have authentication middleware that sets req.user
            if (!req.user) {
                res.status(401).json({
                    status: false,
                    message: 'Unauthorized'
                });
                return;
            }

            // Ensure file is uploaded
            if (!req.file) {
                res.status(400).json({
                    status: false,
                    message: 'Logo file is required'
                });
                return;
            }

            const organizationData = req.body;
            const userId = req.user._id; // From authentication middleware

            const newOrganization = await OrganizationService.createService(req.file, organizationData, userId);

            res.status(201).json({
                status: true,
                data: newOrganization
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error instanceof Error ? error.message : 'An unknown error occurred'
            });
        }
    };

    // Optional: Method to get user's organizations
    public getUserOrganizations = async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    status: false,
                    message: 'Unauthorized'
                });
            }

            const organizations = await OrganizationService.getOrganizationsByUser(req.user._id);

            res.status(200).json({
                status: true,
                data: organizations
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error instanceof Error ? error.message : 'An unknown error occurred'
            });
        }
    };
}

export default new OrganizationController();
