"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (data, schema) => {
    const { error, value } = schema.validate(data, { abortEarly: false, stripUnknown: true });
    if (error) {
        return { value, error: error.details.map((err) => err.message).join(', ') };
    }
    return { value };
};
exports.validate = validate;
