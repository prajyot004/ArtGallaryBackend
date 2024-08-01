const uploadProductPermisssion = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function updateProductcontroller(req, res){
    try{
        if(!uploadProductPermisssion(req.user.id)){
            throw new Error("Permission denied")
        } 

        const {_id, ...resBody} = req.body
        
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.json({
            message: "Product update successfully",
            data: updateProduct,
            success: true,
            error: false
        })
        
    }
    catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateProductcontroller