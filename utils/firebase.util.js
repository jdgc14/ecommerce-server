const { initializeApp } = require('firebase/app')
const {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} = require('firebase/storage')

// Model
const { ProductImg } = require('../models/productImg.model')

const dotenv = require('dotenv')

dotenv.config()

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    appId: process.env.FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

// Storage service
const storage = getStorage(firebaseApp)

const uploadProductImgs = async (imgs, productId) => {
    const imgsPromises = imgs.map(async (img) => {
        // Create firebase reference
        const [originalName, ext] = img.originalname.split('.')

        const filename = `products/${productId}/${originalName}-${Date.now()}.${ext}`
        const imgRef = ref(storage, filename)

        // Upload image to Firebase
        const result = await uploadBytes(imgRef, img.buffer)

        await ProductImg.create({
            productId,
            imgUrl: result.metadata.fullPath,
        })
    })

    await Promise.all(imgsPromises)
}

// To find imgUrls product by product
const getProductImgsUrls = async (product) => {
    const productImgsPromises = product.productImgs.map(async (productImg) => {
        const imgRef = ref(storage, productImg.imgUrl)

        const imgUrl = await getDownloadURL(imgRef)

        productImg.imgUrl = imgUrl

        return productImg
    })
    const productImgs = await Promise.all(productImgsPromises)

    product.productImgs = productImgs

    return product
}

const getProductsImgsUrls = async (products) => {
    const productsWithImgsPromises = products.map(async (product) =>
        // Return a product whit imgUrls updated
        getProductImgsUrls(product)
    )

    return await Promise.all(productsWithImgsPromises)
}

module.exports = {
    storage,
    uploadProductImgs,
    getProductImgsUrls,
    getProductsImgsUrls,
}
