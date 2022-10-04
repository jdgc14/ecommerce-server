const express = require('express')

// Controllers
const {
    getUserOrders,
    getUserOrderById,
} = require('../controllers/orders.controller')

// Middlewares
const { orderExists } = require('../middlewares/orders.middlewares')
const { protectOrderOwner } = require('../middlewares/auth.middlewares')

const ordersRouter = express.Router()

ordersRouter.get('/', getUserOrders)

ordersRouter.get('/:id', orderExists, protectOrderOwner, getUserOrderById)

module.exports = { ordersRouter }
