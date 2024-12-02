import { ProcurementService } from './../services/procurement.service';
import { Router } from 'express';
import { ProcurementController } from '../controllers/procurement.controller';

const procurementRouter = Router();

const procurementService = new ProcurementService();
const procurementController = new ProcurementController(procurementService);

procurementRouter.route('/').post(procurementController.create).get(procurementController.getAllProcurements);
procurementRouter.route('/:id').get(procurementController.getProcurement).patch(procurementController.updateProcurement).delete(procurementController.deleteProcurment);

export default procurementRouter;
