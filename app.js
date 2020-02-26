const express       = require    ('express'), 
      bodyParser    = require    ('body-parser');

app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.use('/products',require('./routes/products'));
app.use('/categories',require('./routes/categories'));
app.use('/profiles',require('./routes/profiles'));


module.exports = app; 