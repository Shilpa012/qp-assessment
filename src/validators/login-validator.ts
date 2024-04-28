import Joi from 'joi';

export const login = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Invalid email format'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is Required',
        'string.empty': 'Item Name is not allowed to be empty'
    }),
})