let router = require('express').Router();

let authenticate = require('../middleware/authenticate');
const userController = require('../controllers/userController');

// login route
router.post('/login',userController.userLogin)

// post route
router.post('/register', userController.userRegistration)

// user list route
router.get('/list',authenticate,userController.userList)

module.exports = router;

