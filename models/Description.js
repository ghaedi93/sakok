const mongoose = require('mongoose');
//Creating Trait Model 
const descriptionSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'products',
        required:true
    },
    price:Number, 
    color:String, 
    isAvailable:Boolean
});
module.exports = Description = mongoose.model('descriptions',descriptionSchema)