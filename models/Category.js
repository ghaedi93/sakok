const mongoose = require('mongoose');
//Creating Category Model 
const categorySchema = new mongoose.Schema({
    name:String,
    id  :String,
    description:String,
});
module.exports = Category = mongoose.model('categories',categorySchema)