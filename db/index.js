const mongoose = require('mongoose');
const {mongoUrl}   = require('../config');
/**
 * this function return a promise first it check NODE_ENV to see 'test'
 * if 'test' exists it run mocks database with mockgoose to execute unit tests
 *  
 */
function connect(){
    return new Promise((resolve, reject)=>{
       if(process.env.NODE_ENV === 'test'){
        const Mockgoose = require('mockgoose').Mockgoose;
        const mockgoose = new Mockgoose(mongoose);
            mockgoose.prepareStorage()
           .then(()=>{
                mongoose.connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true})
                .then((res,err)=>{
                    if(err) return reject(err);
                    console.log('connected to Test database')
                    resolve(); 
                });
           }) 

       } else{
            mongoose.connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true})
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