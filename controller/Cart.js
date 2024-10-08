const { Cart } = require("../model/Cart");
const { User } = require("../model/User");

exports.fetchCartByUser=async(req,res)=>{
    const {user}=req.query;
    try {
        const cartItems=await Cart.find({user:user}).populate('product')
        res.status(200).json(cartItems)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.addToCart=async(req,res)=>{
    const cart=new Cart(req.body);
    try {
        const docs=await cart.save();
        const cartProduct=await docs.populate('product')
        res.status(200).json(cartProduct);
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.deleteFromCart=async(req,res)=>{
    const {id}=req.params;
    try{
        const deletedItems=await Cart.findByIdAndDelete(id);
        res.status(200).json(deletedItems);
    }catch(err){
        res.status(400).json(err);
    }
}

exports.updateCart=async(req,res)=>{
    const {id}=req.params;
    try{
        const updatedItems=await Cart.findByIdAndUpdate(id,req.body,{new:true});
        const updatedCartProduct=await updatedItems.populate('product')
        res.status(200).json(updatedCartProduct);
    }catch(err){
        res.status(400).json(err);
    }
}