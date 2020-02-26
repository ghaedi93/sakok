const mongoose = require('mongoose');
//Creating Trait Model 
const profileSchema = new mongoose.Schema({
    price:Number, 
    color:String, 
    isAvailable:Boolean
});
module.exports = Profile = mongoose.model('profiles',profileSchema)