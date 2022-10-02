// Models
const { Category } = require('../models/category.model')
const { Product } = require('../models/product.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const createCategory = catchAsync(async (req, res, next) => {
    const { name } = req.body

    const category = await Category.create({
        name,
    })

    res.status(201).json({
        status: 'success',
        data: {
            category,
        },
    })
})

const getActiveCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.findAll({
        where: { status: 'active' },
    })

    res.status(200).json({
        status: 'success',
        data: { categories },
    })
})

const updateCategoryById = catchAsync(async (req, res, next) => {
    const { category } = req
    const { name } = req.body

    category.update({ name })

    res.status(200).json({
        status: 'success',
        data: {
            category,
        },
    })
})

module.exports = { createCategory, getActiveCategories, updateCategoryById }
