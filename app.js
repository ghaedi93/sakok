const express       = require    ('express'), 
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


//custom function 
function makeQuery(req){
    const query = {}
    const argumentsNumber = arguments.length;
    //start checking process from index 1 since index 0 is the req and containing incoming http request  
    for(i=1;i<argumentsNumber;i++){
        if(req.query[arguments[i]]){
            query[arguments[i]]=req.query[arguments[i]]
        }
    }
    return query
}



//routes
app.get('/products',(req, res)=>{
    const query = makeQuery(req,'name','id','status','category');    
    Product.find(query).populate('category').then(products=>res.status(200).json(products))
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
    const query = makeQuery(req,'name','id');    
    Category.find(query).then(categories=>res.status(200).json(categories))
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