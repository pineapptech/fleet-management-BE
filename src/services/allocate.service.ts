
import IVehicle from '../interfaces/vehicle.interface';
import Allocate from '../models/allocate.model';
import cloudinary from '../config/cloudinary.config';


interface CloudinaryUploadResult {
    secure_url: string;
    public_id: string;
    [key: string]: any;
}

export class AllocateVehicleService {
    allocateVehicleService = async (file: { [fieldname: string]: Express.Multer.File }, otherData: Partial<IVehicle>) => {
        if (!file) {
            throw new Error('Please provide the image of the recipient.');
        }

        if (!otherData) {
            throw new Error('Each field is required.');
        }

       const allocate = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
           const stream = cloudinary.uploader.upload_stream({ folder: 'allocate' }, (err, data) => {
               if (err) {
                   console.error('Cloudinary upload error:', err); // Log actual Cloudinary error
                   reject(new Error(`Cloudinary error: ${err.message}`));
               } else {
                   console.log('Cloudinary upload successful:', data); // Log success response
                   resolve(data as CloudinaryUploadResult);
               }
           });
           if (!file.buffer) {
               console.error('File buffer is empty');
               reject(new Error('File buffer is empty or invalid'));
           }
           stream.end(file.buffer);
       });


        const allocated = await Allocate.create({
            ...otherData,
            recipient_img_id: allocate.secure_url,
        });

        return allocated; // Return the created record
    };
}


