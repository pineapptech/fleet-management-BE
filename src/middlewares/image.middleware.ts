import multer from 'multer';

const storage = multer.memoryStorage();

// Setting file size limit to 5MB and allowing only certain file types
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
        // Allowed file types
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); 
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.') as any, false); 
        }
    }
});

// Middleware to accept two files with specified field names
const multipleUpload = upload.fields([
    { name: 'vehicle_img', maxCount: 1 },
    { name: 'procurement_img', maxCount: 1 }
]);

export default multipleUpload;
