const addToCartModel = require("../../models/cartProduct.")

const updateAddToCartProduct =  async(req,res)=>{
    try {
        const currentUserId = req.user.id
        const addToCartProductId = req?.body?._id

        const qty = req.body.quantity 
        const updateProduct = await addToCartModel.updateOne({_id: addToCartProductId},{
            // if quantity already available so spread 
            ...(qty && {quantity : qty})
        })

        res.json({
            message: "product updated",
            data: updateProduct,
            error: false,
            success: true
        })
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateAddToCartProduct