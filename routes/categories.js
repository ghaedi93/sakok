const express = require('express');
const router  = express.Router(); 
/**
 * importing database models
 */
const Product = require('../db/models/Product'),
      Category= require('../db/models/Category'),
      Profile=require('../db/models/Profile');
/**
 * makeQuery function creates a query to use in mongoose find method . 
 * @type {object}
 */
const makeQuery=require('../lib/makeQuery');

/**
 * @route  GET /categories
 * @desc   fetch all documents associated with categories collection 
 * @access Public  
 */
router.get('/',(req, res)=>{
    const requestQuery = req.query;
    const query = makeQuery(requestQuery,'name','id'); 
    Category.find(query)
    .then(categories=>res.status(200).json(categories))
    .catch(error=>res.status(400).json(error))
})
/**
 * @route  GET /categories/:id
 * @desc   fetch a documents associated with categories collection based on it object ID  
 * @access Public  
 */
router.get('/:id',(req, res)=>{
    Category.findOne({_id:req.params.id})
    .then(categories=>res.status(200).json(categories))
    .catch(error=>res.status(400).json(error))
})
/**
 * @route  POST /categories
 * @desc   create a new category
 * @access Public  
 */
router.post('/',(req,res)=>{
    Category.create({
        name        :req.body.name,
        id          :req.body.id,
        description :req.body.description
    })
    .then(categories=>res.status(200).json(categories))
    .catch(error=>res.status(400).json(error))
})
/**
 * @route  PUT /categories/:id
 * @desc   updates an already existed category document based on its object ID  
 * @access Public  
 */
router.put('/:id',(req,res)=>{
    Category.updateOne({_id:req.params.id},{$set:req.body})
    .then(result=>res.status(200).json(result))
    .catch(error=>res.status(400).json(error))
})
/**
 * @route  DELETE /categories/:id
 * @desc   deletes an already existed category document based on its oject ID 
 * @access Public  
 */
router.delete('/:id',(req, res)=>{
    Category.deleteOne({_id:req.params.id})
    .then(deletedCategory=>res.status(200).json(deletedCategory))
    .catch(err=>res.status(400).json(err))
})

module.exports = router; 