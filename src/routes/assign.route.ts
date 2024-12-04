import { Router } from 'express';
import multerMiddleware from '../middlewares/multer.middleware';
import assignController from '../controllers/assign.controller';

const assignedRouter = Router();

assignedRouter.route('/assign-vehicle').post(multerMiddleware.upload.single('driver_img_url'), assignController.assignVehicle).get(assignController.getAllAssignedVehicles);
assignedRouter.route('/assign-vehicle/:id').get(assignController.getAssignedVehicle).patch(assignController.updateAssignedVehilce).delete(assignController.deleteAssinedVehilce);

export default assignedRouter;
