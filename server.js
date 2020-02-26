const app = require('./app'),
      db  = require('./db');
const {PORT} = require('./config/keys'); 

db.connect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}`)
    });
});