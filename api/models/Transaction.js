let mongoose = require('mongoose');
let Schema = mongoose.Schema

let transactionSchema = new Schema({
    amount:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true
    },
    note:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
    
},{timestamps:true});

let transactionModel = mongoose.model('Transaction',transactionSchema)
module.exports = transactionModel;