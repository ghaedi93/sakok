const mongoose = require('mongoose');
const {mongoUrl}   = require('../config');

function connect(){
    return new Promise((resolve, reject)=>{
       if(process.env.NODE_ENV === 'test'){
        var Mockgoose = require('mockgoose').Mockgoose;
        var mockgoose = new Mockgoose(mongoose);
            mockgoose.prepareStorage()
           .then(()=>{
            mongoose.connect(mongoUrl,
                {useNewUrlParser:true,useUnifiedTopology:true})
                .then((res,err)=>{
                    if(err) return reject(err);
                    console.log('connected to Test database')
                    resolve(); 
                });
           }) 

       } else{
        mongoose.connect(mongoUrl,
            {useNewUrlParser:true,useUnifiedTopology:true})
            .then((res,err)=>{
                if(err) return reject(err);
                console.log('connected to database')
                resolve(); 
            });
       }
    });
}
function close(){
    return mongoose.disconnect(); 
}
module.exports = { connect, close};