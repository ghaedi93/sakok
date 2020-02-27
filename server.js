const app = require('./app'),
      db  = require('./db');
/**
 * destructure PORT from imported config file
 * @type {string}
 */
const {PORT} = require('./config'); 
/**
 * uses connect method of db module to make a connection to database
 * the connect function is a promise that provide a then callback to start our app after starting database connection. 
 */
db.connect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}`)
    });
});