let mongoose = require('mongoose');
let Schema = mongoose.Schema

let UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    balance:{
        type:Number,
        default:0
    },
    income: {
        type:Number,
        default:0
    },
    expense: {
        type:Number,
        default:0
    },
    transactions: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Transaction'
        }]
    }
})

const User = mongoose.model('User',UserSchema)
module.exports = User