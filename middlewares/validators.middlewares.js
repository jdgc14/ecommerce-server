const { body, checkValidations } = require('../utils/expressValidator.util')

const createUserValidators = [
    body('username')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    checkValidations,
]

module.exports = { createUserValidators }
