import multer from 'multer'

const storage = multer.memoryStorage()

const upload_img = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    
});

const singleFile = upload_img.single('recipient_img_id');

export default singleFile