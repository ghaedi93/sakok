const express = require('express');
const router  = express.Router(); 

const Product = require('../db/models/Product'),
      Category= require('../db/models/Category'),
      Profile=require('../db/models/Profile')

const {makeQuery}=require('../lib');


router.get('/',(req, res)=>{
    const query = makeQuery(req,'name','id','status','category');    
    Product.find(query).populate('category profile')
    .then(products=>res.status(200).json(products))
    .catch(error=>res.status(400).json(error))
})
router.get('/:id',(req, res)=>{
    Product.findOne({_id:req.params.id}).populate('category profile')
    .then(products=>res.status(200).json(products))
    .catch(error=>res.status(400).json(error))
})
router.post('/',(req,res)=>{
    Product.create({
        name        :req.body.name,
        id          :req.body.id,
        description :req.body.description,
        status      :req.body.status,
        category    :req.body.category
    })
    .then(products=>res.json(products))
    .catch(error=>res.status(400).json(error))
})
router.put('/:id',(req,res)=>{
    Product.updateOne({_id:req.params.id},{$set:req.body})
    .then(result=>res.status(200).json(result))
    .catch(error=>res.status(400).json(error))
})
router.delete('/:id',(req, res)=>{
    Product.deleteOne({_id:req.params.id})
    .then(deletedProduct=>res.status(200).json(deletedProduct))
    .catch(err=>res.status(400).json(err))
})

module.exports = router; 