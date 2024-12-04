"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.UserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
class UserValidation {
}
exports.UserValidation = UserValidation;
_a = UserValidation;
UserValidation.registrationSchema = joi_1.default.object({
    fullname: joi_1.default.string().trim().required().messages({
        'string.required': 'Fullname is required'
    }),
    email: joi_1.default.string()
        .email({ tlds: { allow: ['com', 'net', 'org', 'edu'] } })
        .trim()
        .required()
        .messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),
    phone: joi_1.default.string()
        .trim()
        .pattern(/^(090|080|081|091|070)[0-9]{8}$/)
        .required()
        .messages({
        'string.pattern.base': 'Invalid phone number. Must start with 090, 080, 081, 091, or 070 and be 11 digits long',
        'string.empty': 'Phone number is required',
        'any.required': 'Phone number is required'
    }),
    password: joi_1.default.string()
        .trim()
        .min(8)
        .max(30)
        // .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password must be less than 30 characters',
        // 'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character',
        'string.empty': 'Password is required',
        'any.required': 'Password is required'
    }),
    confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).trim().required().messages({
        'any.only': 'Passwords must match',
        'string.empty': 'Confirm password is required',
        'any.required': 'Confirm password is required'
    })
});
UserValidation.procurementSchema = joi_1.default.object({
    orderNumber: joi_1.default.string().trim().optional(), // Since it's not marked as required in the original schema
    procurementType: joi_1.default.string().trim().required().messages({
        'string.empty': 'Procurement type is required',
        'any.required': 'Procurement type is required'
    }),
    vendorName: joi_1.default.string().trim().required().messages({
        'string.empty': 'Vendor name is required',
        'any.required': 'Vendor name is required'
    }),
    description: joi_1.default.string().trim().required().messages({
        'string.empty': 'Description is required',
        'any.required': 'Description is required'
    }),
    quantity: joi_1.default.number().integer().min(1).required().messages({
        'number.base': 'Quantity must be a number',
        'number.integer': 'Quantity must be a whole number',
        'number.min': 'Quantity must be at least 1',
        'any.required': 'Quantity is required'
    }),
    deliveryDate: joi_1.default.date().iso().optional(), // Optional as it was not marked as required in original schema
    budget: joi_1.default.number().min(0).required().messages({
        'number.base': 'Budget must be a number',
        'number.min': 'Budget cannot be negative',
        'any.required': 'Budget is required'
    }),
    priorityLevel: joi_1.default.string().trim().required().messages({
        'string.empty': 'Priority level is required',
        'any.required': 'Priority level is required'
    })
});
// organizationShema
UserValidation.organizationSchema = joi_1.default.object({
    name: joi_1.default.string().trim().required().messages({
        'string.empty': 'Organization name is required',
        'any.required': 'Organization name is required'
    }),
    email: joi_1.default.string()
        .email({ tlds: { allow: ['com', 'net', 'org', 'edu'] } })
        .trim()
        .required()
        .messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),
    type: joi_1.default.string().trim().required().messages({
        'string.empty': 'Organization type is required',
        'any.required': 'Organization type is required'
    }),
    phone: joi_1.default.string()
        .trim()
        .pattern(/^(090|080|081|091|070)[0-9]{8}$/)
        .required()
        .messages({
        'string.pattern.base': 'Invalid phone number. Must start with 090, 080, 081, 091, or 070 and be 11 digits long',
        'string.empty': 'Phone number is required',
        'any.required': 'Phone number is required'
    }),
    logoImgUrl: joi_1.default.string().trim().uri().required().messages({
        'string.uri': 'Invalid logo URL',
        'string.empty': 'Logo URL is required',
        'any.required': 'Logo URL is required'
    }),
    adminFullName: joi_1.default.string().trim().required().messages({
        'string.empty': 'Admin full name is required',
        'any.required': 'Admin full name is required'
    }),
    adminEmail: joi_1.default.string()
        .email({ tlds: { allow: ['com', 'net', 'org', 'edu'] } })
        .trim()
        .required()
        .messages({
        'string.email': 'Please enter a valid admin email address',
        'string.empty': 'Admin email is required',
        'any.required': 'Admin email is required'
    }),
    adminRole: joi_1.default.string().trim().required().messages({
        'string.empty': 'Admin role is required',
        'any.required': 'Admin role is required'
    }),
    adminPhone: joi_1.default.string()
        .trim()
        .pattern(/^(090|080|081|091|070)[0-9]{8}$/)
        .required()
        .messages({
        'string.pattern.base': 'Invalid admin phone number. Must start with 090, 080, 081, 091, or 070 and be 11 digits long',
        'string.empty': 'Admin phone number is required',
        'any.required': 'Admin phone number is required'
    }),
    numberOfVehicles: joi_1.default.number().integer().min(0).required().messages({
        'number.base': 'Number of vehicles must be a number',
        'number.integer': 'Number of vehicles must be a whole number',
        'number.min': 'Number of vehicles cannot be negative',
        'any.required': 'Number of vehicles is required'
    }),
    operationalAreas: joi_1.default.array().items(joi_1.default.string().trim()).min(1).required().messages({
        'array.base': 'Operational areas must be an array',
        'array.min': 'At least one operational area is required',
        'any.required': 'Operational areas are required'
    }),
    vehicleCategories: joi_1.default.string().trim().required().messages({
        'string.empty': 'Vehicle categories are required',
        'any.required': 'Vehicle categories are required'
    })
});
UserValidation.validate = (data, schema = _a.registrationSchema) => {
    const { error, value } = schema.validate(data, {
        abortEarly: false, // collect all errors not just the first one
        allowUnknown: false // reject unknown fields
    });
    if (error) {
        // Transform Joi Validation Error into a more reusable format
        const validationError = error.details.map((err) => ({
            feild: err.path[0],
            message: err.message
                .replace(/^"(.*)" /, '') // Remove quotes from the start of the message
                .replace(/\s*is\s*/, ' ') // Remove 'is' from the message
        }));
        throw new ValidationError('Validation Failed', validationError);
    }
    return value;
};
// Custom Validation Error
class ValidationError extends Error {
    constructor(message, errors) {
        super(message);
        this.name = 'ValidationError';
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
