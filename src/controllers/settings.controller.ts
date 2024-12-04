import { Request, Response } from 'express';
import { SettingsService } from '../services/settings.service';
import { NotFoundError, ValidationError } from '../error/CustomError';

class SettingsController {
    constructor(private settingsService: SettingsService) {
        this.settingsService = settingsService;
    }

    public createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.settingsService.createUserSettings(req.body);

            if (!user) {
                res.status(401).json({
                    status: false,
                    message: 'User Creattion Failed'
                });
                return;
            }

            res.status(200).json({
                status: true,
                message: 'User Created Successfully',
                fullname: user.fullname,
                email: user.email
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

    public getUsers = async (req: Request, res: Response) => {
        try {
            const user = await this.settingsService.getUserData();

            if (!user) {
                res.status(401).json({
                    status: false,
                    message: 'User not found'
                });
                return;
            }
            res.status(200).json({
                status: true,
                data: user
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

    public deleteUser = async (req: Request, res: Response) => {};
}

export default SettingsController;
