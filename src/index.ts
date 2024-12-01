import express, { Application, Request, Response, NextFunction } from 'express';
import { configDotenv } from 'dotenv';
import connectDB from './config/db';
import userRoute from './routes/user.route';
import morgan from 'morgan';
import helmet from 'helmet';
import vehicleRoute from './routes/vehicle.route';
import { globalError } from './middlewares/global-error.middleware';
import allocatedRouter from './routes/allocated.route';
import maintenanceRoute from './routes/maintenance.route';
import assignedRouter from './routes/assign.route';
import cors from 'cors';
import orgRouter from './routes/organization.route';
import cookieParser from 'cookie-parser';

configDotenv();
connectDB();
const app: Application = express();

app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.use('/api/v1/auth', userRoute);
app.use('/api/v1/vehicle', vehicleRoute);
app.use('/api/v1/allocation', allocatedRouter);
app.use('/api/v1/maintainers', maintenanceRoute);
app.use('/api/v1/assigned', assignedRouter);
app.use('/api/v1/organizations', orgRouter);

app.use(globalError);
app.listen(port, () => console.log(`Listening on ${port}`));
