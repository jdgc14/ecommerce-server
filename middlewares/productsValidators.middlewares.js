const { body, checkValidations } = require('../utils/expressValidator.util')

const createProductValidators = [
    body('title')
        .isString()
        .withMessage('Title must be a string')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters'),
    body('description')
        .isString()
        .withMessage('Description must be a string')
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('categoryId')
        .isInt({ min: 1 })
        .withMessage('categoryId must be a integer.'),
    body('quantity')
        .isInt({ min: 0 })
        .withMessage('Quantity must be a integer.'),

    checkValidations,
]

const updateProductValidators = [
    body('title')
        .isString()
        .withMessage('Title must be a string')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters'),
    body('description')
        .isString()
        .withMessage('Description must be a string')
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('quantity')
        .isInt({ min: 0 })
        .withMessage('Quantity must be a integer.'),

    checkValidations,
]

module.exports = { createProductValidators, updateProductValidators }
