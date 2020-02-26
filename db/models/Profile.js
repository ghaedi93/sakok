const mongoose = require('mongoose');
//Creating Trait Model 
const profileSchema = new mongoose.Schema({
    price:Number, 
    color:String, 
    isAvailable:Boolean
},{
    strict: false
  });
module.exports = Profile = mongoose.model('profiles',profileSchema)