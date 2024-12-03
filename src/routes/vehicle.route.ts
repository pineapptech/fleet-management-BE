import express from 'express';
import { VehicleController } from '../controllers/vehicle.controller';

const vehicleRoute = express.Router();

const vehicleController = new VehicleController();

vehicleRoute.route('/add-vehicle').post(vehicleController.uploadVehicleData);
vehicleRoute.route('/vehicle-record').get(vehicleController.getVehicles);
vehicleRoute.route('/vehicle-record/:id').get(vehicleController.getVehicle).patch(vehicleController.updateVehicle).delete(vehicleController.deleteVehicle);

export default vehicleRoute;
