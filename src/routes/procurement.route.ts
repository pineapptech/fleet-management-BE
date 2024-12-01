import { ProcurementService } from './../services/procurement.service';
import { Router } from 'express';
import { ProcurementController } from '../controllers/procurement.controller';

const procurementRouter = Router();

const procurementService = new ProcurementService();
const procurementController = new ProcurementController(procurementService);

procurementRouter.route('/').post(procurementController.create);

export default procurementRouter;
