const express = require('express');
const router  = express.Router(); 

const Product = require('../db/models/Product'),
      Category= require('../db/models/Category'),
      Profile=require('../db/models/Profile')

router.get('/',(req, res)=>{
        Profile.find({})
        .then(profiles=>res.status(200).json(profiles))
          .catch(error=>res.status(400).json(error))
    })
router.get('/:id',(req, res)=>{
        Profile.find({_id:req.params.id}).then(profile=>res.status(200).json(profile))
        .catch(error=>res.status(400).json(error))
    })
router.post('/',(req, res)=>{
        const productId = req.body.productId; 
        delete req.body.productId;
        const profile = req.body; 
        Profile.create(profile)
        .then(recentProfile=>{
            Product.findByIdAndUpdate(productId,{$set:
                {profile:recentProfile._id}})
            .then(result=>res.status(200).json(result))
            .catch(error=>res.status(400).json(error))
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    })
router.put('/:id',(req, res)=>{
    console.log('hitted')
        Profile.updateOne({_id:req.params.id},{$set:req.body})
        .then(result=>res.status(200).json(result))
        .catch(error=>res.status(400).json(error))
    })
router.delete('/:id',(req, res)=>{
        Profile.findByIdAndRemove(req.params.id).then(deletedProfile=>res.status(200).json(deletedProfile))
        .catch(err=>res.status(400).json(err))
    })


module.exports = router; 