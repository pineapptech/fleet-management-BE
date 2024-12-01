import organizationController from '../controllers/organization.controller';
import { Router } from 'express';
import verifyTokenFromCookie from '../middlewares/verify-token.middleware';
import multerMiddleware from '../middlewares/multer.middleware';

const orgRouter = Router();

orgRouter.route('/create-org').post(verifyTokenFromCookie, multerMiddleware.upload.single('logo'), organizationController.createOrganization);

export default orgRouter;
