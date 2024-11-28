import { AllocateUploadController } from '../controllers/allocate.controller';
import { Router } from 'express';
import multerMiddleware from '../middlewares/multer.middleware';

const allocatedRouter = Router();

const allocatedUploadController = new AllocateUploadController();

allocatedRouter.route('/allocate').post(multerMiddleware.upload.single('recipient_img_id'), allocatedUploadController.upload).get(allocatedUploadController.getAllocatedVehicle);

export default allocatedRouter;
