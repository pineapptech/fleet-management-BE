"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
// Setting file size limit to 5MB and allowing only certain file types
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
        // Allowed file types
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'), false);
        }
    }
});
// Middleware to accept two files with specified field names
const multipleUpload = upload.fields([
    { name: 'vehicle_img', maxCount: 1 },
    { name: 'procurement_img', maxCount: 1 }
]);
exports.default = multipleUpload;
