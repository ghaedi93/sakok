const express = require('express');
const router  = express.Router(); 

const Product = require('../db/models/Product'),
      Category= require('../db/models/Category'),
      Profile=require('../db/models/Profile')

const {makeQuery}=require('../lib');

router.get('/',(req, res)=>{
    const query = makeQuery(req,'name','id');    
    Category.find(query).then(categories=>res.status(200).json(categories))
      .catch(error=>res.status(400).json(error))
})
router.get('/:id',(req, res)=>{
    Category.find({_id:req.params.id}).then(categories=>res.status(200).json(categories))
    .catch(error=>res.status(400).json(error))
})
router.post('/',(req,res)=>{
    Category.create({
        name        :req.body.name,
        id          :req.body.id,
        description :req.body.description
    }).then(categories=>res.status(200).json(categories))
    .catch(error=>res.status(400).json(error))
})
router.put('/:id',(req,res)=>{
    Category.updateOne({_id:req.params.id},{$set:req.body})
    .then(result=>res.status(200).json(result))
    .catch(error=>res.status(400).json(error))
})
router.delete('/:id',(req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(deletedCategory=>res.status(200).json(deletedCategory))
    .catch(err=>res.status(400).json(err))
})


module.exports = router; 