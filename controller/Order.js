const { Cart } = require("../model/Cart");
const { Order } = require("../model/Order");
const { User } = require("../model/User");

exports.fetchOrderByUser=async(req,res)=>{
    const {user}=req.query;
    try {
        const orderItems=await Order.find({user:user})
        
        res.status(200).json(orderItems)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.createOrder=async(req,res)=>{
    const order=new Order(req.body);
    try {
        const docs=await order.save();
        
        res.status(200).json(docs);
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.deleteOrder=async(req,res)=>{
    const {id}=req.params;
    try{
        const deletedOrders=await Order.findByIdAndDelete(id);
        res.status(200).json(deletedOrders);
    }catch(err){
        res.status(400).json(err);
    }
}

exports.updateOrder=async(req,res)=>{
    const {id}=req.params;
    try{
        const updatedOrders=await Order.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(updatedOrders);
    }catch(err){
        res.status(400).json(err);
    }
}