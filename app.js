const express = require('express')

// Utils
const { AppError } = require('./utils/appError.util')

// Routers
const { usersRouter } = require('./routes/users.routes')
const { cartsRouter } = require('./routes/carts.routes')
const { productsRouter } = require('./routes/products.routes')

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller')

// Init our Express app
const app = express()

// Enable Express app to receive JSON data
app.use(express.json())

// Define endpoints
app.use('/api/v1/cart', cartsRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/products', productsRouter)

// Catch non-existing endpoints
app.all('*', (req, res, next) => {
    return next(
        new AppError(
            `${req.method} ${req.url} does not exists in our server`,
            404
        )
    )
})

// Global error handler

app.use(globalErrorHandler)

module.exports = { app }
