const productModel = require("../models/product");
const companyModel = require("../models/company");
const sellerModel = require("../models/seller");
const express = require("express");
const router = express.Router();
router.use(express.json());


router.post("/newProduct",(req,res) => {
    const {newProduct} = req.body;
    productModel.create(newProduct);
    return res.json({data:"add new product"});
 });

 router.get("/productlist",async(req,res) =>{
      const productlist = await productModel.find({});
      if(productlist.length === 0){
          return res.json({data : "no data in compnay"});
      }
      return res.json({data :productlist});
  });

  router.get("/productOfCompnay", async (req,res)=>{
    const t = req.body.title;
    if(t){
        const details = await productModel.findOne({title:t});
        const cDetail = await companyModel.find({},{company_id:details["company_id"]});
        return res.json({data:cDetail});
    }
    return res.json({data:"No Data Found"});
});
router.get("/productOfSeller", async (req,res)=>{
    const t = req.body.title;
    if(t){
        const details = await productModel.findOne({title:t});
        const sDetail = await companyModel.find({},{seller_id:details["seller_id"]});
        return res.json({data:sDetail});
    }
    return res.json({data:"No Data Found"});
});

  router.put("/updateproduct/:pid",async(req,res) =>{
    const pid = req.params.pid
    const cate= req.body.category;
    const updateproduct = await productModel.findOneAndUpdate(
        {product_id:pid},
        {category:cate},
        {new:true}
        );
        return res.json({data : "product updated sucessfully"});
  });

  router.delete("/deleteproduct/:pid",async(req,res) =>{
    const deleteproduct= await productModel.findOneAndDelete({
        product_id:req.params.pid
    });
     return res.json({ data : "product deleted successfully"});
  });
module.exports = router;