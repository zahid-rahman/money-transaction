let validator = require('validator');

const validate = user => {
    let error = {}

    //email validation
    if (!user.email) {
        error.email = 'Please provide your email address'
    }
    else if (!validator.isEmail(user.email)) {
        error.email = 'Please provide a valid email address'
    }

    //password validation
    if (!user.password) {
        error.password = 'Please provide a password'
    }
    else if (user.password.length < 6) {
        error.password = 'Password must be larger than 6 characters'
    }


    return {
        error,
        isValidate: Object.keys(error).length === 0
    }
}

module.exports = validate