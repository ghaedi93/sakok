const express       = require    ('express'), 
      bodyParser    = require    ('body-parser');

// initialize our express app
app = express()
// parse incoming http request before reaching our handlers 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

/**
 * invokes relevent router middleware based of provided route
 *  hitted by user. 
 */
app.use('/products',require('./routes/products'));
app.use('/categories',require('./routes/categories'));
app.use('/profiles',require('./routes/profiles'));


module.exports = app; 