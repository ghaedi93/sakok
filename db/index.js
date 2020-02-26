const mongoose = require('mongoose');
const {mongoUrl}   = require('../config/keys');

function connect(){
    return new Promise((resolve, reject)=>{
        console.log()
       if(process.env.NODE_ENV === 'test'){
        var Mockgoose = require('mockgoose').Mockgoose;
        var mockgoose = new Mockgoose(mongoose);
            mockgoose.prepareStorage()
           .then(()=>{
            console.log(process.env.NODE_ENV)
            mongoose.connect(mongoUrl,
                {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
                .then((res,err)=>{
                    if(err) return reject(err);
                    resolve(); 
                });
           }) 

       } else{
        mongoose.connect(mongoUrl,
            {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
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