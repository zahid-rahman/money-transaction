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

/* 
    middleware setup
*/

// cors setup
app.use(cors())
// morgan setyp
app.use(morgan('dev'))
//body parser setup
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


/* 
    home route setup
*/
app.use('/',indexRouter)
 

/* 
    starting start setup
*/
let PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
    mongoose.connect("mongodb://localhost/money-management-app", 
    { 
        useNewUrlParser: true ,
        useUnifiedTopology: true 
    },
    () => {
        console.log("database connected")
    })
})