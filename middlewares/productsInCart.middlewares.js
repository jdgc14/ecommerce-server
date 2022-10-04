// Models
const { ProductInCart } = require('../models/productInCart.model')

// Utils
const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const checkProductInCart = catchAsync(async (req, res, next) => {
    const { productId, quantity } = req.body

    const { cart } = req

    const productInCart = await ProductInCart.findOne({
        where: {
            cartId: cart.id,
            productId,
        },
    })

    if (!productInCart) {
        return next()
    }

    if (productInCart.status === 'active') {
        return next(new AppError('This product already in the cart', 400))
    }

    if (productInCart.status === 'removed') {
        await productInCart.update({
            status: 'active',
            quantity,
        })
        res.status(200).json({
            status: 'success',
            data: { productInCart },
        })
    }
})

const checkProductInCartExists = catchAsync(async (req, res, next) => {
    const productId = req.body.productId || req.params.productId

    const { cart } = req

    const productInCart = await ProductInCart.findOne({
        where: {
            cartId: cart.id,
            productId,
            status: 'active',
        },
    })

    if (!productInCart) {
        return next(
            new AppError('This product does not exist in the cart', 404)
        )
    }

    req.productInCart = productInCart

    next()
})

const checkNewQuantityIsZero = catchAsync(async (req, res, next) => {
    const { newQty } = req.body

    const { productInCart } = req

    if (newQty < 1) {
        await productInCart.update({
            quantity: 0,
            status: 'removed',
        })

        res.status(200).json({
            status: 'success',
            data: { productInCart },
        })
    }

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
module.exports = {
    checkProductInCart,
    checkProductInCartExists,
    checkNewQuantityIsZero,
    checkQuantity,
}
