const mongoose = require('mongoose');
//Creating Category Model 
const categorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    id  :{type:String,required:true},
    description:{type:String,required:true}
});
module.exports = Category = mongoose.model('categories',categorySchema)