let User = require('../models/User');
let loginValidator = require('../validator/loginValidate');
let registerValidator = require('../validator/registerValidate');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');


/* user login */
let userLogin = (req, res) => {
    let { email, password } = req.body;
    let validation = loginValidator({
        email,
        password,
    })

    if (!validation.isValidate) {
        return res.status(400).json(validation.error);
    }

    User.findOne({ email })
        .then(user => {
            // finding the user exist or not
            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                })
            }

            // matching password
            bcrypt.compare(password, user.password, (error, result) => {
                // checking the error 
                if (error) {
                    return res.status(400).json({
                        message: error
                    })
                }

                if (!result) {
                    return res.status(400).json({
                        message: "Password doesn't match"
                    })
                }

                // generating jwt
                let token = jwt.sign({
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }, 'SECRET', { expiresIn: '2h' });

                res.status(200).json({
                    message: "Login successful",
                    token: `Bearer ${token}`
                })

            })

        })
}


/* user registration */
let userRegistration = (req, res) => {
    // client data 
    let { username, email, password, confirmPassword } = req.body
    //validate the checker
    let validation = registerValidator({
        username,
        email,
        password,
        confirmPassword
    })

    if (!validation.isValidate) {
        res.status(400).json(validation.error)
    }
    else {
        //check the duplicate user
        User.findOne({ email })
            .then((user) => {
                if (user) {
                    return res.status(400).json({
                        message: "Email already exist"
                    })
                }

                bcrypt.hash(password, 11, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Server error occured"
                        })
                    }

                    //New user Object create
                    let createUser = new User({
                        name: username,
                        email,
                        password: hash,
                        balance:0,
                        income:0,
                        expense:0,
                        transactions:[]
                    });

                    //Save user to Database
                    createUser.save()
                        .then(registeredUser => {
                            //response back with new data
                            res.status(201).json({
                                message: "user created successfully"
                            });
                        });
                });
            })
            .catch(error => {
                console.log(error)
                res.status(400).json({
                    message: error
                })
            })
    }
}

let userList = (req,res) => {
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch(error => {
        console.log(error)
        console.error(error)
    })
}

module.exports = {
    userLogin,
    userRegistration,
    userList
}