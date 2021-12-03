require("dotenv").config();
const express = require("express");
const router = express.Router();
router.use(express.json());
const sellerModel = require("../models/seller");
const productModel = require("../models/product");

router.post("/newSeller",(req,res) => {
  const{newSeller} = req.body;
  sellerModel.create(newSeller);
  return res.json({data:"inserted sucessfully"});
});

router.get("/sellerlist",async(req,res) =>{
  const name = req.body.name;
  const details = await sellerModel.findOne({name:name});
  if(details){
      const pDetail = await productModel.findOne({product_id:details["product_id"]});
      return res.json({data:pDetail});
  }
  return res.json({data:"No Data Found"});
});

router.get("/slist",async(req,res) =>{
  const sellerlist = await sellerModel.find({});
  if(sellerlist.length === 0){
      return res.json({data : "no data in seller"});
  }
  return res.json({data :sellerlist});
});

router.put("/updateseller/:pid",async(req,res) =>{
  const pid = req.params.pid
  const name= req.body.name;
  const updatesekker = await sellerModel.findOneAndUpdate(
      {product_id:pid},
      {name:name},
      {new:true}
      );
      return res.json({data : "seller updated sucessfully"});
});

router.delete("/deleteseller/:sid",async(req,res) =>{
  const deleteseller= await sellerModel.findOneAndDelete({
      seller_id:req.params.sid
  });
   return res.json({ data : "seller deleted successfully"});
});
module.exports = router;

