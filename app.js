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



const server = app.listen(keys.port,(req, res)=>{
    console.log('app is running and listening to port',keys.port)
})