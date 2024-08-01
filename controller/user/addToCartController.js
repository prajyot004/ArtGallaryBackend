const addToCartModel = require("../../models/cartProduct.")

const addToCartController = async(req, res)=>{
    try{
        const { productId } = req?.body
        const currentUser = req.user.id

        const isProductAvailable = await addToCartModel.findOne({productId})  

        if(isProductAvailable){
            return res.json({
                message : "Already exist in Add to Cart",
                success : false,
                error : true 
            })
        }

        const payload = {
            productId : productId,
            quantity : 1,
            userId : currentUser,
        }

        const newAddToCart = new addToCartModel(payload)
        
        const saveProduct = await newAddToCart.save()

        return res.json({
            data : saveProduct,
            message : "Product Added to Cart",
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = addToCartController