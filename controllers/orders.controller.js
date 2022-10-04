// Models
const { Cart } = require('../models/cart.model')
const { Order } = require('../models/order.model')
const { Product } = require('../models/product.model')
const { Category } = require('../models/category.model')
const { ProductInCart } = require('../models/productInCart.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')

const getUserOrders = catchAsync(async (req, res, next) => {
    const userId = req.sessionUser.id

    const userOrders = await Order.findAll({
        where: { userId },
        attributes: ['id', 'totalPrice', 'createdAt'],
        include: {
            model: Cart,
            attributes: ['id', 'status'],
            include: {
                model: ProductInCart,
                required: false,
                where: { status: 'purchased' },
                attributes: ['id', 'quantity'],
                include: {
                    model: Product,
                    attributes: ['id', 'title', 'description', 'price'],
                    include: { model: Category, attributes: ['id', 'name'] },
                },
            },
        },
    })

    res.status(200).json({
        status: 'success',
        data: { userOrders },
    })
})

const getUserOrderById = catchAsync(async (req, res, next) => {
    const { order } = req

    res.status(200).json({
        status: 'success',
        data: { order },
    })
})

module.exports = { getUserOrders, getUserOrderById }
