// Models
const { Cart } = require('../models/cart.model')
const { Order } = require('../models/order.model')
const { Product } = require('../models/product.model')
const { Category } = require('../models/category.model')
const { ProductInCart } = require('../models/productInCart.model')

// Utils
const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const orderExists = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const order = await Order.findOne({
        where: { id },
        attributes: ['id', 'totalPrice', 'createdAt', 'userId'],
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

    if (!order) {
        return next(new AppError('Order not found', 404))
    }

    req.order = order
    next()
})

module.exports = {
    orderExists,
}
