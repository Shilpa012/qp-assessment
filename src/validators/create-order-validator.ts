import Joi from 'joi';

export const createOrder = Joi.object({
    groceryItemList: Joi.array().items(
        Joi.object({
            _id: Joi.string().required().messages({
                'string.empty': 'Grocery item Id cannot be empty',
                'any.required': 'Grocery item Id is required',
            }),
            name: Joi.string().required().messages({
                'string.empty': 'Grocery item name cannot be empty',
                'any.required': 'Grocery item name is required',
            }),
            unit: Joi.string().required().messages({
                'string.empty': 'Unit cannot be empty',
                'any.required': 'Unit is Required',
            }),
            quantity: Joi.number().integer().min(1).required().messages({
                'number.base': 'Quantity must be a number',
                'number.integer': 'Quantity must be an integer',
                'number.min': 'Quantity must be at least 1',
                'any.required': 'Quantity is required',
            }),
            price: Joi.number().integer().min(1).required().messages({
                'number.base': 'Price must be a number',
                'number.integer': 'Price must be an integer',
                'number.min': 'Price must be at least 1',
                'any.required': 'Price is required',
            }),
        })
    ).required().messages({
        'array.base': 'Grocery item list must be an array',
        'array.empty': 'Grocery item list cannot be empty',
        'any.required': 'Grocery item list is required',
    }),
    deliveryAddress: Joi.object({
        address: Joi.string().required().messages({
            'string.empty': 'Address cannot be empty',
            'any.required': 'Address is required',
        }),
        city: Joi.string().required().messages({
            'string.empty': 'City cannot be empty',
            'any.required': 'City is required',
        }),
        state: Joi.string().required().messages({
            'string.empty': 'State cannot be empty',
            'any.required': 'State is required',
        }),
        country: Joi.string().required().messages({
            'string.empty': 'Country cannot be empty',
            'any.required': 'Country is required',
        }),
        zipcode: Joi.string().required().messages({
            'string.empty': 'Zipcode cannot be empty',
            'any.required': 'Zipcode is required',
        }),
    }).required().messages({
        'object.missing': 'Delivery address is required',
    }),

    customerDetails: Joi.object({
        firstName: Joi.string().required().messages({
            'string.empty': 'First name cannot be empty',
            'any.required': 'First name is required',
        }),
        lastName: Joi.string().required().messages({
            'string.empty': 'Last name cannot be empty',
            'any.required': 'Last name is required',
        }),
        email: Joi.string().email().required().messages({
            'string.empty': 'Email cannot be empty',
            'any.required': 'Email is required',
            'string.email': 'Invalid email format',
        }),
    }).required().messages({
        'object.missing': 'Customer details are required',
    }),
});
