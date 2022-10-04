const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

// Models
const { User } = require('../models/user.model')

// Utils
const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

dotenv.config()

const protectSession = catchAsync(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1] // -> [Bearer, token]
    }

    if (!token) {
        return next(new AppError('The token was invalid', 403))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({
        where: { id: decoded.id, status: 'active' },
        attributes: { exclude: ['password'] },
    })

    if (!user) {
        return next(
            new AppError('The owner of the session is no longer active', 403)
        )
    }

    req.sessionUser = user
    next()
})

const protectUsersAccount = (req, res, next) => {
    const { sessionUser, user } = req

    if (sessionUser.id !== user.id) {
        return next(new AppError('You are not the owner of this account.', 403))
    }

    next()
}

const protectAdmin = (req, res, next) => {
    const { sessionUser } = req

    if (sessionUser.role !== 'admin') {
        return next(
            new AppError('You do not have the right access level.', 403)
        )
    }

    next()
}

const protectOrderOwner = (req, res, next) => {
    const { sessionUser, order } = req

    if (sessionUser.id !== order.userId) {
        return next(new AppError('This order does not belong to you.', 403))
    }

    order.userId = undefined

    next()
}

const protectProductOwner = (req, res, next) => {
    const { sessionUser, product } = req

    if (sessionUser.id !== product.userId) {
        return next(new AppError('This product does not belong to you.', 403))
    }

    next()
}

module.exports = {
    protectSession,
    protectUsersAccount,
    protectAdmin,
    protectOrderOwner,
    protectProductOwner,
}
