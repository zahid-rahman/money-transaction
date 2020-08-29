let Transaction = require('../models/Transaction')
let User = require('../models/User')

// transaction list 
let findTransactionList = (req,res) => {
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
}

// create valid transaction 
let createTransaction = (req,res) => {
    let {amount,type,note} = req.body
    let userId = req.user._id

    console.log(req.user)

    let transaction = new Transaction({
        amount, type, note, author : userId
    })

    transaction.save()
        .then(trans => {
            let updateUser = {...req.user._doc}
            if(type === "income"){
                updateUser.balance = updateUser.balance + amount
                updateUser.income = updateUser.income + amount
            }
            else if(type === 'expense'){
                if(updateUser.balance === 0){
                    return res.json({
                        message : "Insufficient balance"
                    });
                }else{
                    updateUser.balance = updateUser.balance - amount
                    updateUser.expense = updateUser.expense + amount
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
