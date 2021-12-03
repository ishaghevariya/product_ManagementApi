const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
    {
        "company_id" : String,
        "name" : String,
        "product_id" :  String
    });

const companyModel = mongoose.model("company",companySchema,"company");

module.exports = companyModel;