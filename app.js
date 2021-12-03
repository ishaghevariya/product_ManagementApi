require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");

mongoose
.connect(
    process.env.MONGOURL
).then(() => console.log("mongo db connected"));

const productRouter = require("./routers/product");
const companyRouter = require("./routers/company");
const sellerRouter = require("./routers/seller");
//const { Mongoose } = require("mongoose");

app.use("/product",productRouter);
app.use("/company",companyRouter);
app.use("/seller",sellerRouter);

app.listen(port,() => {
    console.log(`App Runing on ${port}`);
});