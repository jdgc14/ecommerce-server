// Models
const { Product } = require('../models/product.model')

// Utils
const { AppError } = require('../utils/appError.util')
const { catchAsync } = require('../utils/catchAsync.util')

const productExists = catchAsync(async (req, res, next) => {
    const id = req.params.id || req.body.productId || req.params.productId

    const product = await Product.findOne({
        where: { id },
    })

    if (!product) {
        return next(new AppError('product not found', 404))
    }

    req.product = product

    next()
})

module.exports = {
    productExists,
}
