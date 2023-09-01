const express=require('express');
const server=express();
const mongoose=require('mongoose');
const { createProduct } = require('./controller/Product');
const cors=require('cors')

const productsRouter=require('./routes/Products')
const categoriesRouter=require('./routes/Category')
const brandsRouter=require('./routes/Brand')
server.use(cors(
    {
        exposedHeaders:['X-Total-Count']
    }
))
server.use(express.json())//to parse req.body

//middleware
server.use('/products',productsRouter.router)
server.use('/categories',categoriesRouter.router)
server.use('/brands',brandsRouter.router)
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