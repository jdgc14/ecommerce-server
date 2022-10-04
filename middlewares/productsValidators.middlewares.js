const { body, checkValidations } = require('../utils/expressValidator.util')

const createProductValidators = [
    body('title')
        .isString()
        .withMessage('title must be a string')
        .isLength({ min: 3 })
        .withMessage('title must be at least 3 characters'),
    body('description')
        .isString()
        .withMessage('description must be a string')
        .isLength({ min: 10 })
        .withMessage('description must be at least 10 characters'),
    body('price').isNumeric().withMessage('price must be a number'),
    body('categoryId')
        .isInt({ min: 1 })
        .withMessage('categoryId must be a integer.'),
    body('quantity')
        .isInt({ min: 0 })
        .withMessage('quantity must be a integer.'),

    checkValidations,
]

const updateProductValidators = [
    body('title')
        .isString()
        .withMessage('title must be a string')
        .isLength({ min: 3 })
        .withMessage('title must be at least 3 characters'),
    body('description')
        .isString()
        .withMessage('description must be a string')
        .isLength({ min: 10 })
        .withMessage('description must be at least 10 characters'),
    body('price').isNumeric().withMessage('price must be a number'),
    body('quantity')
        .isInt({ min: 0 })
        .withMessage('quantity must be a integer.'),

    checkValidations,
]

module.exports = { createProductValidators, updateProductValidators }
