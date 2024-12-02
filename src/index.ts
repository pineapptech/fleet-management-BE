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
import procurementRouter from './routes/procurement.route';

configDotenv();
connectDB();

const corsOptions = {
    origin: ['*', 'https://fleet-management-fe.vercel.app', 'http://localhost:3000'], // Replace with your frontend domain https://fleet-management-fe.vercel.app
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
const app: Application = express();

app.use(morgan('tiny'));
app.use(helmet());
app.use(cors(corsOptions));
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
app.use('/api/v1/procurement', procurementRouter);

app.use(globalError);
app.listen(port, () => console.log(`Listening on ${port}`));
