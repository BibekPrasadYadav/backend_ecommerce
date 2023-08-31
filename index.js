const express=require('express');
const server=express();
const mongoose=require('mongoose');
const { createProduct } = require('./controller/Product');

const productsRouter=require('./routes/Products')

server.use(express.json())//to parse req.body

//middleware
server.use('/products',productsRouter.router)

//dbconnection
main().catch(err=>console.log(err))

async function main(){
await mongoose.connect("mongodb://127.0.0.1:27017/backend_ecommerce")
console.log("db connected")
}

server.get("/",(req,res)=>{
    res.send("hello world")
})

server.listen(8080,()=>{
    console.log("Server started at 8080");
})