const mongoose = require('mongoose');
//Creating Product Model 
//status is eather 1 or 0...0 means does not exist and 1 means exists
const productSchema = new mongoose.Schema({
    name:String,
    id  :String,
    description:String,
    status:{type:String,required:true},
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'categories'
    }
});
module.exports = Product = mongoose.model('products',productSchema)