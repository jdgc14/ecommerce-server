// Models
const { Cart } = require('../models/cart.model')
const { ProductInCart } = require('../models/productInCart.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const addProductToCart = catchAsync(async (req, res, next) => {
    const { productId, quantity } = req.body

    const { cart } = req

    const productInCart = await ProductInCart.create({
        cartId: cart.id,
        productId,
        quantity,
    })

    res.status(200).json({
        status: 'success',
        data: {
            cart,
            productInCart,
        },
    })
})

const updateProductInCart = catchAsync(async (req, res, next) => {
    const { newQty } = req.body

    const { productInCart } = req

    await productInCart.update({
        quantity: newQty,
        status: 'active',
    })

    res.status(200).json({
        status: 'success',
        data: { productInCart },
    })
})

const deleteProductInCartById = catchAsync(async (req, res, next) => {
    const { productInCart } = req

    await productInCart.update({
        quantity: 0,
        status: 'removed',
    })

    res.status(204).json({
        status: 'success',
        data: { productInCart },
    })
})

const purchaseCart = catchAsync(async (req, res, next) => {})

module.exports = {
    addProductToCart,
    updateProductInCart,
    deleteProductInCartById,
}
