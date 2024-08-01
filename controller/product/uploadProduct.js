const uploadProductPermisssion = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function UploadProductContoller(req , res){
    try {
        const sessionId = req.user.id
        if(!uploadProductPermisssion(sessionId)){
            throw new Error("Permission denied")
        }


        const uploadProduct = new productModel(req.body)
        const saveProduct = uploadProduct.save()

        res.status(201).json({
            message: "Product upload Successfully",
            error: false,
            success: true,
            data: saveProduct
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports= UploadProductContoller 