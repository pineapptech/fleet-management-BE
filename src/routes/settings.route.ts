import { Router } from 'express';
const settngsRoute = Router();

import SettingsController from '../controllers/settings.controller';
import { SettingsService } from '../services/settings.service';
import verifyToken from '../middlewares/verify-token.middleware';
import AdminMiddleware from '../middlewares/admin-access.middleware';
const settingsService = new SettingsService();
const settings = new SettingsController(settingsService);

settngsRoute.route('/').post(verifyToken, AdminMiddleware.checkAdminAccess, settings.createUser).get(verifyToken, AdminMiddleware.checkAdminAccess, settings.getUsers);

export default settngsRoute;
