// Models
const { Product } = require('../models/product.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const productExists = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const product = await Product.findOne({
        where: { id, status: 'active' },
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
