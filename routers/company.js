
const companyModel = require("../models/company");
const productModel = require("../models/product");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.post("/newCompany",(req,res) => {
  const {newCompany} = req.body;
  companyModel.create(newCompany);
  return res.json({data:"registration sucessfully"});
});

router.get("/list",async(req,res) =>{
  const name = req.body.name;
  const cdetalis = await companyModel.findOne({name:name});
  if(cdetalis){
    const companyList = await productModel.findOne({product_id:cdetalis["product_id"]});
    return res.json({data :companyList});
  }
  return res.json({data:"No data found"});
});

router.put("/updatecompany/:cid",async(req,res) =>{
  const cid = req.params.cid
  const pid= req.body.product_id;
  const updatecompany = await companyModel.findOneAndUpdate(
      {company_id:cid},
      {product_id:pid},
      {new:true}
      );
      return res.json({data : "company updated sucessfully"});
});

router.delete("/deletecompany/:cid",async(req,res) =>{
  const deletecompany= await companyModel.findOneAndDelete({
      company_id:req.params.cid
  });
   return res.json({ data : "company deleted successfully"});
});


module.exports = router;

