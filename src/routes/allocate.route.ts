import express from 'express';
import AllocateVehicleController from '../controllers/allocate.controller';
import singleFile from '../middlewares/allocate.middleware';

const allocateRouter = express.Router();

const allocateVehicleController = new AllocateVehicleController()

allocateRouter.route('/allocate').post(singleFile, allocateVehicleController.allocateVehicle)

export default allocateRouter;