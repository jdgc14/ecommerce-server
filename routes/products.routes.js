const express = require('express')

// Controllers
const {
    createProduct,
    getActiveProducts,
    getProductById,
    updateProductById,
    deleteProductById,
} = require('../controllers/products.controller')

const {
    createCategory,
    getActiveCategories,
    updateCategoryById,
} = require('../controllers/categories.controller')

// Middlewares
const {
    protectSession,
    protectProductOwner,
} = require('../middlewares/auth.middlewares')
const { productExists } = require('../middlewares/products.middlewares')
const { categoryExists } = require('../middlewares/categories.middlewares')

// Validators
const {
    createProductValidators,
    updateProductValidators,
} = require('../middlewares/productsValidators.middlewares')

const {
    categoryValidators,
} = require('../middlewares/categoriesValidators.middlewares')

// Utils
const { upload } = require('../utils/multer.util')

const productsRouter = express.Router()

productsRouter.get('/', getActiveProducts)

productsRouter.get('/categories', getActiveCategories)

productsRouter.get('/:id', productExists, getProductById)

// EndPoints protecteds
productsRouter.use(protectSession)

productsRouter.post(
    '/',
    upload.array('productImg', 5),
    createProductValidators,
    categoryExists,
    createProduct
)

productsRouter.patch(
    '/:id',
    productExists,
    protectProductOwner,
    updateProductValidators,
    updateProductById
)

productsRouter.delete(
    '/:id',
    productExists,
    protectProductOwner,
    deleteProductById
)

productsRouter.post('/categories', categoryValidators, createCategory)

productsRouter.patch(
    '/categories/:id',
    categoryExists,
    categoryValidators,
    updateCategoryById
)

module.exports = { productsRouter }
