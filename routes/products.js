const express = require('express');
const router  = express.Router(); 
/**
 * importing database models
 */
const Product = require('../db/models/Product'),
      Category= require('../db/models/Category'),
      Profile=require('../db/models/Profile')
/**
 * makeQuery function creates a query to use in mongoose find method . 
 * @type {object}
 * @returns {object}
 */
const makeQuery=require('../lib/makeQuery');

/**
 * @route  GET /products
 * @desc   fetch all documents associated with products collection 
 * @access Public  
 */
router.get('/',(req, res)=>{
    const requestQuery = req.query;
    const query = makeQuery(requestQuery,'id','name','status','category');    
    Product.find(query).populate('category profile')
    .then(products=>res.status(200).json(products))
    .catch(error=>res.status(400).json(error))
})
/**
 * @route  GET /products/:id
 * @desc   fetch a documents associated with products collection based on it object ID  
 * @access Public  
 */
router.get('/:id',(req, res)=>{
    Product.findOne({_id:req.params.id}).populate('category profile')
    .then(products=>res.status(200).json(products))
    .catch(error=>res.status(400).json(error))
})
/**
 * @route  POST /products
 * @desc   create a new product
 * @access Public  
 */
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
/**
 * @route  PUT /products/:id
 * @desc   updates an already existed product document based on its object ID  
 * @access Public  
 */
router.put('/:id',(req,res)=>{
    Product.updateOne({_id:req.params.id},{$set:req.body})
    .then(result=>res.status(200).json(result))
    .catch(error=>res.status(400).json(error))
})
/**
 * @route  DELETE /products/:id
 * @desc   deletes an already existed product document based on its oject ID 
 * @access Public  
 */
router.delete('/:id',(req, res)=>{
    Product.deleteOne({_id:req.params.id})
    .then(deletedProduct=>res.status(200).json(deletedProduct))
    .catch(err=>res.status(400).json(err))
})

module.exports = router; 