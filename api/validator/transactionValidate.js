const validate = (transaction) => {
    let error = {}
    if(!transaction.amount){
        error.amount = "Please set a minimum amount"
    }

    if(!transaction.type){
        error.type = "Please provide a transaction type"
    }

    if(!transaction.note){
        error.note = "Please provide a transaction note"
    }

    return {
        error,
        isValid: Object.keys(error).length === 0 
    }

}

module.exports = validate