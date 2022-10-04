// Models
const { Order } = require('../models/order.model')
const { Product } = require('../models/product.model')
const { ProductInCart } = require('../models/productInCart.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')

const addProductToCart = catchAsync(async (req, res, next) => {
    const { productId, quantity } = req.body

    const { cart } = req

    const productInCart = await ProductInCart.create({
        cartId: cart.id,
        productId,
        quantity,
    })

    res.status(201).json({
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

const purchaseCart = catchAsync(async (req, res, next) => {
    const { sessionUser, cart } = req

    let totalPrice = 0

    const productsInCartPromises = cart.productInCarts.map(
        async (productInCart) => {
            const product = await Product.findOne({
                where: { id: productInCart.productId },
            })

            const subTotal = product.price * productInCart.quantity

            const newQuantity = product.quantity - productInCart.quantity

            totalPrice += subTotal

            await product.update({ quantity: newQuantity })

            await productInCart.update({ status: 'purchased' })
        }
    )

    await cart.update({
        status: 'purchased',
    })

    await Promise.all(productsInCartPromises)

    const order = await Order.create({
        userId: sessionUser.id,
        cartId: cart.id,
        totalPrice,
    })

    res.status(201).json({
        status: 'success',
        data: { order },
    })
})

module.exports = {
    addProductToCart,
    updateProductInCart,
    deleteProductInCartById,
    purchaseCart,
}
