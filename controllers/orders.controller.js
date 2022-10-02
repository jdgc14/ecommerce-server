// Models
const { User } = require('../models/user.model')
const { Order } = require('../models/order.model')
const { Product } = require('../models/product.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const getUserOrders = catchAsync(async (req, res, next) => {
    const { sessionUser } = req

    const userOrders = await Order.findAll({
        where: { userId: sessionUser.id },
    })

    res.status(200).json({
        status: 'success',
        data: { sessionUser, userOrders },
    })
})

const getUserOrderById = catchAsync(async (req, res, next) => {
    const { sessionUser, order } = req

    res.status(200).json({
        status: 'success',
        data: { sessionUser, order },
    })
})

module.exports = { getUserOrders, getUserOrderById }
