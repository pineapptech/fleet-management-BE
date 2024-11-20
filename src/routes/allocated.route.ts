import { AllocateUploadController } from './../controllers/allocated.controller';
import { Router } from "express";
import multerMiddleware from '../middlewares/multer.middleware';


const allocatedRouter = Router()

const allocatedUploadController = new AllocateUploadController();

allocatedRouter.route('/allocate').post(multerMiddleware.upload.single('recipient_img_id'), allocatedUploadController.upload);

export default allocatedRouter