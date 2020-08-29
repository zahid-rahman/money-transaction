let router = require('express').Router();
let Transaction = require('../models/Transaction')
let User = require('../models/User')

let authenticate = require('../middleware/authenticate');
const transactionController = require('../controllers/transactionController');

// list of all transaction
router.get('/list',transactionController.findTransactionList)

// create a valid transaction
router.post('/create', authenticate,transactionController.createTransaction )

//single transaction 
router.get('/:transactionId',transactionController.findSingleTransaction)

// delete transaction
router.delete('/:transactionId',transactionController.deleteSingleTransaction)

// update transaction
router.patch('/:transactionId',transactionController.updateSingleTransaction)

module.exports = router;
