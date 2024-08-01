const expres = require('express')

const router = expres.Router()

const userSignUpController = require('../controller/user/UserSignUp')
const userSignInContoller = require('../controller/user/UserSignIn')
const authToken = require('../middleware/authToken')
const userDetailController = require('../controller/user/UserDetail')
const userLogout = require('../controller/user/UserLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser') 
const UploadProductContoller = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductcontroller = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updataAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')


router.get('/',(req,res)=>{
    res.status(200).json({message:"hello world"});
})


router.post("/signup", userSignUpController)
router.post("/signin", userSignInContoller)
router.get("/user-details", authToken, userDetailController)
router.get("/userLogout", userLogout)


// admin panel
router.get("/all-user",authToken, allUsers)
router.post("/update-user",authToken, updateUser)


//product
router.post("/upload-product", authToken, UploadProductContoller)
router.get("/get-product", getProductController)
router.post("/update-product",authToken, updateProductcontroller)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details",  getProductDetails)
router.get("/search", searchProduct)
router.post("/filter-product",filterProductController)

// add to cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCartProduct",authToken, countAddToCartProduct)
router.get("/view-cart-product",authToken, addToCartViewProduct)
router.post("/update-cart-product",authToken, updateAddToCartProduct)
router.post("/delete-cart-product",authToken, deleteAddToCartProduct)


module.exports = router


