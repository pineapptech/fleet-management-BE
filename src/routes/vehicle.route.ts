import express from 'express';
import { VehicleController } from '../controllers/vehicle.controller';

const vehicleRoute = express.Router();

const vehicleController = new VehicleController();

vehicleRoute.route('/add-vehicle').post(vehicleController.uploadVehicleData);
vehicleRoute.route('/vehicle-record').get(vehicleController.getVehicles);

export default vehicleRoute;
