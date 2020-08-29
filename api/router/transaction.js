let router = require('express').Router();
let Transaction = require('../models/Transaction')
let User = require('../models/User')

let authenticate = require('../middleware/authenticate');

// list of all transaction
router.get('/',authenticate,(req,res) => {
    Transaction.find()
    .then(transactions => {
        if(transactions.length === 0){
            res.json({
                message : "No transaction found"
            })
        }else{
            res.json(transactions)
        }
    })
    .catch(error => console.log(error))
})

// create a valid transaction
router.post('/create',(req,res) => {
    let {amount,type,note} = req.body
    let userId = req.user._id

    let transaction = new Transaction({
        amount, type, note, author : userId
    })

    transaction.save()
        .then(trans => {
            let updateUser = {...req.user}
            if(type === "income"){
                updateUser.balance = updateUser.balance + amount
                updateUser.income = updateUser.income + amount
            }
            else if(type === 'expense'){
                updateUser.balance = updateUser.balance - amount
                updateUser.expense = updateUser.expense + amount
            }

            updateUser.transactions.unshift(trans._id)

            User.findByIdAndUpdate(updateUser._id,{$set:updateUser})
                .then(() => {
                    res.json({
                        message : 'Transaction created successfully'
                    })
                })

        })
        .catch(error => console.log(error))
})

//single transaction 
router.get('/:transactionId',(req,res) => {
    let { transactionId } = req.params
    Transaction.findById(transactionId)
    .then(transaction => {
        res.json(transaction)
    })
    .catch(error => console.log(error))
})

// delete transaction
router.delete('/:transactionId',(req,res) => {
    let { transactionId } = req.params
    Transaction.findByIdAndDelete(transactionId)
    .then(() => {
        res.json({
            message : "Transaction deleted successfully"
        })
    })
    .catch(error => console.log(error))
})

// update transaction
router.patch('/:transactionId',(req,res) => {
    let { transactionId } = req.params
    Transaction.findByIdAndUpdate(transactionId,{$set:req.body})
    .then(() => {
        res.json({
            message : "transaction updated successfully"
        })
    })
    .catch(error => console.log(error))
})

module.exports = router;
