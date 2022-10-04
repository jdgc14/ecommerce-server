// Models
const { User } = require('./user.model')
const { Cart } = require('./cart.model')
const { Order } = require('./order.model')
const { Product } = require('./product.model')
const { Category } = require('./category.model')
const { ProductImg } = require('./productImg.model')
const { ProductInCart } = require('./productInCart.model')

const initModels = () => {
    // 1 User <---> M Order
    User.hasMany(Order, { foreignKey: 'userId' })
    Order.belongsTo(User)

    // 1 User <---> M Product
    User.hasMany(Product, { foreignKey: 'userId' })
    Product.belongsTo(User)

    // 1 User <---> 1 Cart
    User.hasOne(Cart, { foreignKey: 'userId' })
    Cart.belongsTo(User)

    // 1 Product <---> 1 Category
    Category.hasMany(Product, { foreignKey: 'categoryId' })
    Product.belongsTo(Category)

    // 1 Product <---> M ProductImg
    Product.hasMany(ProductImg, { foreignKey: 'productId' })
    ProductImg.belongsTo(Product)

    // 1 Product <---> 1 ProductInCart
    Product.hasOne(ProductInCart, { foreignKey: 'productId' })
    ProductInCart.belongsTo(Product)

    // 1 Cart <---> M ProductInCart
    Cart.hasMany(ProductInCart, { foreignKey: 'cartId' })
    ProductInCart.belongsTo(Cart)

    // 1 Cart <---> 1 Order
    Cart.hasOne(Order, { foreignKey: 'cartId' })
    Order.belongsTo(Cart)
}

module.exports = { initModels }
