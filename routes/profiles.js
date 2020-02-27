const express = require('express');
const router  = express.Router(); 
/**
 * importing database models
 */
const Product = require('../db/models/Product'),
      Category= require('../db/models/Category'),
      Profile=require('../db/models/Profile')

/**
 * @route  GET /profiles
 * @desc   fetch all documents associated with profiles collection 
 * @access Public  
 */
router.get('/',(req, res)=>{
        Profile.find({})
        .then(profiles=>res.status(200).json(profiles))
          .catch(error=>res.status(400).json(error))
    })
/**
 * @route  GET /profiles/:id
 * @desc   fetch a documents associated with profile collection based on it object ID  
 * @access Public  
 */
router.get('/:id',(req, res)=>{
        Profile.findOne({_id:req.params.id}).then(profile=>res.status(200).json(profile))
        .catch(error=>res.status(400).json(error))
    })
/**
 * @route  POST /profiles
 * @desc   create a new profile for a product
 * @access Public  
 */
router.post('/',(req, res)=>{
        const productId = req.body.productId; 
        delete req.body.productId;
        const profile = req.body; 
        Profile.create(profile)
        .then(recentProfile=>{
            Product.updateOne({_id:productId},{$set:
                {profile:recentProfile._id}})
            .then(result=>res.status(200).json(result))
            .catch(error=>res.status(400).json(error))
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    })
/**
 * @route  PUT /profiles/:id
 * @desc   updates an already existed profile of a product document based on its object ID  
 * @access Public  
 */
router.put('/:id',(req, res)=>{
        Profile.updateOne({_id:req.params.id},{$set:req.body})
        .then(result=>res.status(200).json(result))
        .catch(error=>res.status(400).json(error))
    })
/**
 * @route  DELETE /profiles/:id
 * @desc   deletes an already existed profile of a prooduct document based on its oject ID 
 * @access Public  
 */
router.delete('/:id',(req, res)=>{
        Profile.deleteOne({_id:req.params.id})
        .then(deletedProfile=>res.status(200).json(deletedProfile))
        .catch(err=>res.status(400).json(err))
    })

module.exports = router; 