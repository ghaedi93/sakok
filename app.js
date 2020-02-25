const express       = require('express'), 
      bodyParser    = require    ('body-parser'),
      mongoose      = require    ('mongoose'),
      keys          = require    ('./config/keys')

app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

const mongoConnection = mongoose.connect(keys.mongoUrl,{useUnifiedTopology:true,useNewUrlParser:true})
.then(()=>console.log('connected to MongoDB SuccessFully'))
.catch((err)=>console.log(err))

//importing models 

const Product = require('./models/Product'),
      Category= require('./models/Category')

//routes
app.get('/products',(req, res)=>{
    Product.find({}).populate('category').then(products=>res.status(200).json(products))
      .catch(error=>res.json(error))
})
app.get('/products/:id',(req, res)=>{
    Product.find({_id:req.params.id}).populate('category').then(products=>res.status(200).json(products))
    .catch(error=>res.json(error))
})
app.post('/products',(req,res)=>{
    Product.create({
        name        :req.body.name,
        id          :req.body.id,
        description :req.body.description,
        status      :req.body.status,
        category    :req.body.category
    }).then(products=>res.json(products))
    .catch(error=>res.json(error))
})
app.put('/products/:id',(req,res)=>{
    Product.updateOne({_id:req.params.id},{$set:req.body})
    .then(result=>res.status(200).json(result))
    .catch(error=>res.json(error))
})
app.delete('/products/:id',(req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(deletedProduct=>res.status(200).json(deletedProduct))
    .catch(err=>res.json(err))
})


app.get('/categories',(req, res)=>{
    Category.find({}).then(categories=>res.status(200).json(categories))
      .catch(error=>res.json(error))
})
app.get('/categories/:id',(req, res)=>{
    Category.find({_id:req.params.id}).then(categories=>res.status(200).json(categories))
    .catch(error=>res.json(error))
})
app.post('/categories',(req,res)=>{
    Category.create({
        name        :req.body.name,
        id          :req.body.id,
        description :req.body.description
    }).then(categories=>res.status(200).json(categories))
    .catch(error=>res.json(error))
})
app.put('/categories/:id',(req,res)=>{
    Category.updateOne({_id:req.params.id},{$set:req.body})
    .then(result=>res.status(200).json(result))
    .catch(error=>res.json(error))
})
app.delete('/categories/:id',(req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(deletedCategory=>res.status(200).json(deletedCategory))
    .catch(err=>res.json(err))
})
const server = app.listen(keys.port,(req, res)=>{
    console.log('app is running and listening to port',keys.port)
})