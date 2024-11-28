import Joi from 'joi';

class UserValidation {
    static registrationSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: ['com', 'net', 'org', 'edu'] } })
            .trim()
            .required()
            .messages({
                'string.email': 'Please enter a valid email address',
                'string.empty': 'Email is required',
                'any.required': 'Email is required'
            }),
        phone: Joi.string()
            .trim()
            .pattern(/^(090|080|081|091|070)[0-9]{8}$/)
            .required()
            .messages({
                'string.pattern.base': 'Invalid phone number. Must start with 090, 080, 081, 091, or 070 and be 11 digits long',
                'string.empty': 'Phone number is required',
                'any.required': 'Phone number is required'
            }),
        password: Joi.string()
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
        confirmPassword: Joi.string().valid(Joi.ref('password')).trim().required().messages({
            'any.only': 'Passwords must match',
            'string.empty': 'Confirm password is required',
            'any.required': 'Confirm password is required'
        })
    });

    static organizationSchema = Joi.object({
        name: Joi.string().trim().required().messages({
            'string.empty': 'Organization name is required',
            'any.required': 'Organization name is required'
        }),
        email: Joi.string()
            .email({ tlds: { allow: ['com', 'net', 'org', 'edu'] } })
            .trim()
            .required()
            .messages({
                'string.email': 'Please enter a valid email address',
                'string.empty': 'Email is required',
                'any.required': 'Email is required'
            }),
        type: Joi.string().trim().required().messages({
            'string.empty': 'Organization type is required',
            'any.required': 'Organization type is required'
        }),
        phone: Joi.string()
            .trim()
            .pattern(/^(090|080|081|091|070)[0-9]{8}$/)
            .required()
            .messages({
                'string.pattern.base': 'Invalid phone number. Must start with 090, 080, 081, 091, or 070 and be 11 digits long',
                'string.empty': 'Phone number is required',
                'any.required': 'Phone number is required'
            }),
        logoImgUrl: Joi.string().trim().uri().required().messages({
            'string.uri': 'Invalid logo URL',
            'string.empty': 'Logo URL is required',
            'any.required': 'Logo URL is required'
        }),
        adminFullName: Joi.string().trim().required().messages({
            'string.empty': 'Admin full name is required',
            'any.required': 'Admin full name is required'
        }),
        adminEmail: Joi.string()
            .email({ tlds: { allow: ['com', 'net', 'org', 'edu'] } })
            .trim()
            .required()
            .messages({
                'string.email': 'Please enter a valid admin email address',
                'string.empty': 'Admin email is required',
                'any.required': 'Admin email is required'
            }),
        adminRole: Joi.string().trim().required().messages({
            'string.empty': 'Admin role is required',
            'any.required': 'Admin role is required'
        }),
        adminPhone: Joi.string()
            .trim()
            .pattern(/^(090|080|081|091|070)[0-9]{8}$/)
            .required()
            .messages({
                'string.pattern.base': 'Invalid admin phone number. Must start with 090, 080, 081, 091, or 070 and be 11 digits long',
                'string.empty': 'Admin phone number is required',
                'any.required': 'Admin phone number is required'
            }),
        numberOfVehicles: Joi.number().integer().min(0).required().messages({
            'number.base': 'Number of vehicles must be a number',
            'number.integer': 'Number of vehicles must be a whole number',
            'number.min': 'Number of vehicles cannot be negative',
            'any.required': 'Number of vehicles is required'
        }),
        operationalAreas: Joi.array().items(Joi.string().trim()).min(1).required().messages({
            'array.base': 'Operational areas must be an array',
            'array.min': 'At least one operational area is required',
            'any.required': 'Operational areas are required'
        }),
        vehicleCategories: Joi.string().trim().required().messages({
            'string.empty': 'Vehicle categories are required',
            'any.required': 'Vehicle categories are required'
        })
    });
    static validate = (data: any, schema = this.registrationSchema) => {
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
                    .replace(/\s*is\s*/, '') // Remove 'is' from the message
            }));

            throw new ValidationError('Validation Failed', validationError);
        }

        return value;
    };
}

// Custom Validation Error

class ValidationError extends Error {
    errors: any[];

    constructor(message: string, errors: any[]) {
        super(message);
        this.name = 'ValidationError';
        this.errors = errors;
    }
}

export { UserValidation, ValidationError };
