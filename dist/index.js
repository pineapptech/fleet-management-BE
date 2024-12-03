"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const db_1 = __importDefault(require("./config/db"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const vehicle_route_1 = __importDefault(require("./routes/vehicle.route"));
const global_error_middleware_1 = require("./middlewares/global-error.middleware");
const allocated_route_1 = __importDefault(require("./routes/allocated.route"));
const maintenance_route_1 = __importDefault(require("./routes/maintenance.route"));
const assign_route_1 = __importDefault(require("./routes/assign.route"));
const cors_1 = __importDefault(require("cors"));
const organization_route_1 = __importDefault(require("./routes/organization.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const procurement_route_1 = __importDefault(require("./routes/procurement.route"));
const CustomError_1 = require("./error/CustomError");
const settings_route_1 = __importDefault(require("./routes/settings.route"));
(0, dotenv_1.configDotenv)();
(0, db_1.default)();
const corsOptions = {
    origin: ['*', 'https://fleet-management-fe.vercel.app', 'http://localhost:3000'], // Replace with your frontend domain https://fleet-management-fe.vercel.app
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('tiny'));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
app.use('/api/v1/auth', user_route_1.default);
app.use('/api/v1/vehicle', vehicle_route_1.default);
app.use('/api/v1/allocation', allocated_route_1.default);
app.use('/api/v1/maintainers', maintenance_route_1.default);
app.use('/api/v1/assigned', assign_route_1.default);
app.use('/api/v1/organizations', organization_route_1.default);
app.use('/api/v1/procurement', procurement_route_1.default);
app.use('/api/v1/settings', settings_route_1.default);
// DEFAULT ROUTE
app.use('*', (req, res, next) => {
    const error = new CustomError_1.CustomError(`Oops...., It seems like the Route ${req.originalUrl} You are looking for does not Exist`, 404);
    next(error);
});
app.use(global_error_middleware_1.globalError);
app.listen(port, () => console.log(`Listening on ${port}`));
