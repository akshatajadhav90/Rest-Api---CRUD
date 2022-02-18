const express = require("express");
const mongoose=require("mongoose");
const bodyParser = require("body-parser")
const app=express();

mongoose.connect("mongodb://localhost:27017//sample",{UseNewUrlParser:true}).then(()=>{
    console.log("connected with mongodb")
}).catch((err)=>{
    console.log(err)
})




app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())

const productSchema=new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
})

const product=new mongoose.model("product",productSchema)

//create product
app.post("/api/v1/product/new",async(req,res)=>{
    const product=await Product.create(req.body);

    res.status(200).json({
        success:true,
        product
    })
})

//read product
app.get("/api/v1/products",async(req,res)=>{
    const products=await Product.find();
    res.status(200).json({success:true,
    products})
})

// Update product
app.put("/api/v1/product/:id",async(req,res)=>{
    let product = await Product.findById(req.params.id);

    product = await product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:false,
        runvalidators:true

    })


// Delete product
app.delete("/api/v1/product/:id",async(req,res)=>{
    const Product=await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    await Product.remove();



    res.status(200).json({
        success:true,
        message:"Product is detected Successfully"
    })
})


    res.status(200).json({
        success:true,
        product
    })
})



app.listen(4500,()=>{
    console.log("server is working http://localhost:4500")
})