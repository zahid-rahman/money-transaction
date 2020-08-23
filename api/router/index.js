let router = require('express').Router();
let userRouter = require('./user');
let transactionRouter = require('./transaction');

router.use('/user',userRouter)
router.use('/transaction',transactionRouter)

router.get('/' , (req,res) => {
    res.json({
        "data" : "In api server"
    });
});

module.exports = router;