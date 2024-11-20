import express, {Application, Request, Response, NextFunction} from 'express';
import { configDotenv } from 'dotenv';
import connectDB from './config/db';
import userRoute from './routes/user.route';
import morgan from 'morgan';
import helmet from 'helmet';
import vehicleRoute from './routes/vehicle.route';
import { globalError } from './middlewares/global-error.middleware';
import allocateRouter from './routes/allocate.route';
import allocatedRouter from './routes/allocated.route';
import maintenanceRoute from './routes/maintenance.route';

configDotenv()
connectDB()
const app: Application = express();

app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
const port = process.env.PORT || 3000;

app.use('/api/v1/auth', userRoute)
app.use('/api/v1/vehicle', vehicleRoute)
app.use('/api/v1/allocation', allocateRouter)
app.use('/api/v1/allocated', allocatedRouter)
app.use('/api/v1/maintainers', maintenanceRoute)

app.use(globalError)
app.listen(port, () => console.log(`Listening on ${port}`));