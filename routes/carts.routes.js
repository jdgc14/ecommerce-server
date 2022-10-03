const express = require('express')

// Controllers
const {
    addProductToCart,
    updateProductInCart,
    deleteProductInCartById,
    purchaseCart,
} = require('../controllers/carts.controller')

// Middlewares
const { cartIsActive } = require('../middlewares/carts.middlewares')

const { protectSession } = require('../middlewares/auth.middlewares')

const { productExists } = require('../middlewares/products.middlewares')

const {
    checkProductInCart,
    checkProductInCartExists,
    checkNewQuantityIsZero,
    checkQuantity,
} = require('../middlewares/productsInCart.middlewares')

// Validators
const {
    addProductValidators,
    updateProductValidators,
} = require('../middlewares/cartsValidators.middlewares')

const cartsRouter = express.Router()

cartsRouter.use(protectSession)

cartsRouter.post(
    '/add-product',
    cartIsActive,
    addProductValidators,
    productExists,
    checkQuantity,
    checkProductInCart,
    addProductToCart
)

cartsRouter.patch(
    '/update-cart',
    cartIsActive,
    updateProductValidators,
    productExists,
    checkQuantity,
    checkProductInCartExists,
    checkNewQuantityIsZero,
    updateProductInCart
)

cartsRouter.delete(
    '/:productId',
    cartIsActive,
    productExists,
    checkProductInCartExists,
    deleteProductInCartById
)

cartsRouter.post('/purchase', cartIsActive, purchaseCart)

module.exports = { cartsRouter }
