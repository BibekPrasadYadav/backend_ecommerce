const { Brand } = require("../model/Brand");
const { Category } = require("../model/Category");

exports.createCategories=async(req,res)=>{
    const category=new Category(req.body)
    try {
        const docs=await category.save()
        res.status(200).json(docs)
    } catch (err) {
        res.status(400).json(err)        
    }
}

exports.fetchCategories=async(req,res)=>{
    try{
        const categories=await Category.find({}).exec();
        res.status(200).json(categories);
    }catch(err){
        res.status(404).json(err)
    }
}
