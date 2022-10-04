const { body, checkValidations } = require('../utils/expressValidator.util')

const addProductValidators = [
    body('productId')
        .isInt({ min: 1 })
        .withMessage('productId must be a integer.'),
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('quantity must be a integer.'),

    checkValidations,
]

const updateProductValidators = [
    body('productId')
        .isInt({ min: 1 })
        .withMessage('productId must be a integer.'),
    body('newQty').isInt().withMessage('newQty must be a integer.'),

    checkValidations,
]

module.exports = { addProductValidators, updateProductValidators }
