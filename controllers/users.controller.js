const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

// Models
const { User } = require('../models/user.model')
const { Order } = require('../models/order.model')
const { Product } = require('../models/product.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

dotenv.config()

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
        where: { status: 'active' },
        include: [],
    })

    res.status(200).json({
        status: 'success',
        data: { users },
    })
})

const createUser = catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    })

    newUser.password = undefined

    res.status(201).json({
        status: 'success',
        data: { newUser },
    })
})

const updateUser = catchAsync(async (req, res, next) => {
    const { username } = req.body
    const { user } = req

    await user.update({ username })

    res.status(200).json({
        status: 'success',
        data: { user },
    })
})

const deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req

    await user.update({ status: 'deleted' })

    res.status(204).json({ status: 'success' })
})

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({
        where: { email, status: 'active' },
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Wrong credentials', 400))
    }

    user.password = undefined

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })

    res.status(200).json({
        status: 'success',
        data: { user, token },
    })
})

const getUserProducts = catchAsync(async (req, res, next) => {
    const { sessionUser } = req

    const userProducts = await User.findOne({
        where: { id: sessionUser.id },
        attributes: { exclude: ['password'] },
        include: { model: Product },
    })

    res.status(200).json({
        status: 'success',
        data: { userProducts },
    })
})

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    login,
    getUserProducts,
}
