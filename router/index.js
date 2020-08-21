let router = require('express').Router();
let userRouter = require('./user');

router.use('/user',userRouter)

router.get('/' , (req,res) => {
    res.json({
        "data" : "api sever running"
    });
});

module.exports = router;