"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const organization_service_1 = __importDefault(require("../services/organization.service"));
class OrganizationController {
    constructor() {
        this.createOrganization = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Ensure you have authentication middleware that sets req.user
                if (!req.user) {
                    res.status(401).json({
                        status: false,
                        message: 'Unauthorized'
                    });
                    return;
                }
                // Ensure file is uploaded
                if (!req.file) {
                    res.status(400).json({
                        status: false,
                        message: 'Logo file is required'
                    });
                    return;
                }
                const organizationData = req.body;
                const userId = req.user._id; // From authentication middleware
                const newOrganization = yield organization_service_1.default.createService(req.file, organizationData, userId);
                res.status(201).json({
                    status: true,
                    data: newOrganization
                });
            }
            catch (error) {
                res.status(500).json({
                    status: false,
                    message: error instanceof Error ? error.message : 'An unknown error occurred'
                });
            }
        });
        // Optional: Method to get user's organizations
        this.getUserOrganizations = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({
                        status: false,
                        message: 'Unauthorized'
                    });
                    return;
                }
                const organizations = yield organization_service_1.default.getOrganizationsByUser(req.user._id);
                res.status(200).json({
                    status: true,
                    data: organizations
                });
            }
            catch (error) {
                res.status(500).json({
                    status: false,
                    message: error instanceof Error ? error.message : 'An unknown error occurred'
                });
            }
        });
    }
}
exports.default = new OrganizationController();
