import Joi from 'joi';

export const createUser = Joi.object({
    firstName: Joi.string().required().messages({
        'any.required': 'First Name is Required',
        'string.empty': "First Name is not allowed to be empty"
    }),
    lastName: Joi.string().required().messages({
        'any.required': 'Last Name is Required',
        'string.empty': "Last Name is not allowed to be empty"
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Invalid email format'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is Required',
        'string.empty': "Password is not allowed to be empty"
    }),
});
