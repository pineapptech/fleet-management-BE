"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const procurement_service_1 = require("./../services/procurement.service");
const express_1 = require("express");
const procurement_controller_1 = require("../controllers/procurement.controller");
const procurementRouter = (0, express_1.Router)();
const procurementService = new procurement_service_1.ProcurementService();
const procurementController = new procurement_controller_1.ProcurementController(procurementService);
procurementRouter.route('/').post(procurementController.create);
exports.default = procurementRouter;