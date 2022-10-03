// Models
const { Cart } = require('../models/cart.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const cartIsActive = catchAsync(async (req, res, next) => {
    const { sessionUser } = req

    let cart = await Cart.findOne({
        where: { userId: sessionUser.id, status: 'active' },
    })

    if (!cart) {
        cart = await Cart.create({
            userId: sessionUser.id,
        })
    }

    req.cart = cart

    next()
})

// This function check quantity of products in stock
const checkQuantity = catchAsync(async (req, res, next) => {
    const { product } = req

    const quantity = req.body.quantity || req.body.newQty

    if (product.quantity < quantity) {
        return next(new AppError("We don't have enough quantity in stock", 400))
    }

    next()
})

module.exports = { cartIsActive, checkQuantity }
