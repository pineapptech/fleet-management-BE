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
Object.defineProperty(exports, "__esModule", { value: true });
class AdminMiddleware {
    /**
     * Middleware to check if the user is an admin
     * @param req Express request object
     * @param res Express response object
     * @param next Express next function
     */
    static checkAdminAccess(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Assume the user is attached to the request after authentication middleware
                const user = req.user;
                // Check if user exists and has admin role
                if (!user) {
                    res.status(401).json({
                        message: 'Unauthorized: User not authenticated'
                    });
                    return;
                }
                // Adjust this condition based on how you store admin status in your user model
                if (user.role !== 'manager') {
                    res.status(403).json({
                        message: 'Forbidden: Admin access required'
                    });
                    return;
                }
                // If user is an admin, proceed to the next middleware/route handler
                next();
            }
            catch (error) {
                console.error('Admin access check error:', error);
                res.status(500).json({
                    message: 'Internal server error during admin access check'
                });
            }
        });
    }
    /**
     * Middleware to check admin access and log the attempt
     * @param req Express request object
     * @param res Express response object
     * @param next Express next function
     */
    static checkAdminAccessWithLogging(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                // Log all access attempts
                console.log(`Admin access attempt by user: ${(user === null || user === void 0 ? void 0 : user.id) || 'Unknown'}`);
                if (!user) {
                    return res.status(401).json({
                        message: 'Unauthorized: User not authenticated'
                    });
                }
                if (user.role !== 'manager') {
                    // Log denied access attempts
                    console.warn(`Admin access denied for user: ${user.id}`);
                    return res.status(403).json({
                        message: 'Forbidden: Admin access required'
                    });
                }
                next();
            }
            catch (error) {
                console.error('Admin access check with logging error:', error);
                res.status(500).json({
                    message: 'Internal server error during admin access check'
                });
            }
        });
    }
    /**
     * Utility method to check admin status without middleware context
     * @param user User object to check admin status
     * @returns Boolean indicating admin status
     */
    static isUserAdmin(user) {
        return user && user.isAdmin === true;
    }
}
exports.default = AdminMiddleware;
