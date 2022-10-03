// Models
const { Product } = require('../models/product.model')
const { Category } = require('../models/category.model')
const { ProductImg } = require('../models/productImg.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const {
    uploadProductImgs,
    getProductsImgsUrls,
} = require('../utils/firebase.util')

const createProduct = catchAsync(async (req, res, next) => {
    const { title, description, price, categoryId, quantity } = req.body
    const { sessionUser } = req

    const product = await Product.create({
        title,
        description,
        quantity,
        price,
        categoryId,
        userId: sessionUser.id,
    })

    await uploadProductImgs(req.files, product.id)

    res.status(201).json({
        status: 'success',
        data: { product },
    })
})

const getActiveProducts = catchAsync(async (req, res, next) => {
    const products = await Product.findAll({
        where: { status: 'active' },
        include: [{ model: ProductImg }, { model: Category }],
    })

    const productsWithImgs = await getProductsImgsUrls(products)

    res.status(200).json({
        status: 'success',
        data: { products: productsWithImgs },
    })
})

const getProductById = catchAsync(async (req, res, next) => {
    const { product } = req

    res.status(200).json({
        status: 'success',
        data: { product },
    })
})

const updateProductById = catchAsync(async (req, res, next) => {
    const { product } = req

    const { title, description, price, quantity } = req.body

    await product.update({
        title,
        description,
        price,
        quantity,
    })

    res.status(200).json({
        status: 'success',
        data: { product },
    })
})

const deleteProductById = catchAsync(async (req, res, next) => {
    const { product } = req

    await product.update({
        status: 'deleted',
    })

    res.status(204).json({
        status: 'success',
        data: { product },
    })
})

module.exports = {
    createProduct,
    getActiveProducts,
    getProductById,
    updateProductById,
    deleteProductById,
}
