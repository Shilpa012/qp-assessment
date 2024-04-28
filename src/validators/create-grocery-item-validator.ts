import Joi from 'joi';

export const createGroceryItem = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Item Name is Required',
        'string.empty': 'Item Name is not allowed to be empty'
    }),
    unit: Joi.string().required().messages({
        'any.required': 'Unit is Required',
        'string.empty': 'Unit is not allowed to be empty'
    }),
    price: Joi.number().min(1).required().messages({
        'number.base': 'Price is Required',
    }),
    quantity: Joi.number().min(1).required().messages({
        'number.base': 'Quantity is Required',
    }),
})