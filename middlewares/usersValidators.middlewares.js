const { body, checkValidations } = require('../utils/expressValidator.util')

const createUserValidators = [
    body('username')
        .isString()
        .withMessage('username must be a string')
        .isLength({ min: 3 })
        .withMessage('username must be at least 3 characters'),
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString()
        .withMessage('password must be a string')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters'),
    checkValidations,
]

module.exports = { createUserValidators }
