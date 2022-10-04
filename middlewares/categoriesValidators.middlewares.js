const { body, checkValidations } = require('../utils/expressValidator.util')

const categoryValidators = [
    body('name')
        .isString()
        .withMessage('name must be a string')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 characters'),
    checkValidations,
]

module.exports = { categoryValidators }
