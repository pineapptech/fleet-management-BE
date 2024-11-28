import { Router } from 'express';
import multerMiddleware from '../middlewares/multer.middleware';
import maintenanceController from '../controllers/maintenance.controller';

const maintenanceRoute = Router();

maintenanceRoute.route('/maintenance-record').post(multerMiddleware.upload.single('invoice_img_url'), maintenanceController.createMaintenance);
maintenanceRoute.route('/maintenance-record').get(maintenanceController.getAllMaintenedVehicles);
export default maintenanceRoute;
