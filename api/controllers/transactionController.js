let Transaction = require('../models/Transaction')
let User = require('../models/User')
let transactionValidation = require('../validator/transactionValidate');
// transaction list 
let findTransactionList = (req,res) => {
    let { _id } = req.user
    Transaction.find({author:_id})
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
}

// create valid transaction 
let createTransaction = (req,res) => {
    let {amount,type,note} = req.body
    let userId = req.user._id

    let validation = transactionValidation({
        amount,type,note
    })

    if (!validation.isValidate) {
        return res.status(400).json(validation.error);
    }else{
        let transaction = new Transaction({
            amount, type, note, author : userId
        })

        transaction.save()
        .then(trans => {
            let updateUser = {...req.user._doc}
            if(type === "income"){
                updateUser.balance = updateUser.balance + Number(amount)
                updateUser.income = updateUser.income + Number(amount)
            }
            else if(type === 'expense'){
                if(updateUser.balance === 0){
                    return res.json({
                        message : "Insufficient balance"
                    });
                }else{
                    updateUser.balance = updateUser.balance - Number(amount)
                    updateUser.expense = updateUser.expense + Number(amount)
                }
    
            }
            console.log(updateUser)
            updateUser.transactions.unshift(trans._id)

            User.findByIdAndUpdate(updateUser._id,{$set:updateUser},{new:true})
                .then(() => {
                    res.json({
                        message : 'Transaction created successfully'
                    })
                })

        })
        .catch(error => console.log(error))
    }

}

// single transaction 
let findSingleTransaction = (req,res) => {
    let { transactionId } = req.params
    Transaction.findById(transactionId)
    .then(transaction => {
        res.json(transaction)
    })
    .catch(error => console.log(error))
}

// delete transaction 
let deleteSingleTransaction = (req,res) => {
    let { transactionId } = req.params
    Transaction.findByIdAndDelete(transactionId)
    .then(() => {
        res.json({
            message : "Transaction deleted successfully"
        })
    })
    .catch(error => console.log(error))
}

// update a transaction
let updateSingleTransaction = (req,res) => {
    let { transactionId } = req.params
    Transaction.findByIdAndUpdate(transactionId,{$set:req.body})
    .then(() => {
        res.json({
            message : "transaction updated successfully"
        })
    })
    .catch(error => console.log(error))
}

module.exports = {
    findTransactionList,
    createTransaction,
    findSingleTransaction,
    updateSingleTransaction,
    deleteSingleTransaction,

}
