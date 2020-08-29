/* 
    importing module
*/
const express = require('express');
const app = express()
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const indexRouter = require('./router/index');
const dotenv = require('dotenv');
const passport = require('passport');
dotenv.config()
/* 
    all middleware setup
*/

// cors setup
app.use(cors())
// morgan setyp
app.use(morgan('dev'))
//body parser setup
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// passport js setup
app.use(passport.initialize())
require('./passport')(passport)

/* 
    home route setup
*/
app.use('/',indexRouter)
 

/* 
    starting start setup
*/
let PORT = process.env.PORT || 4000
let connectionString = process.env.DB_CLOUD_CONNECTION_STRING
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
    mongoose.connect(connectionString, 
    { 
        useNewUrlParser: true ,
        useUnifiedTopology: true 
    },
    () => {
        console.log("database connected")
    })
})