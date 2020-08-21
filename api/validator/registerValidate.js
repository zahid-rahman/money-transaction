let validator = require('validator');

const validate = user => {
    let error = {}

    // username validation
    if (!user.username) {
        error.username = 'Please provide your username'
    }

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

    //password confirmation
    if (!user.confirmPassword) {
        error.confirmPassword = 'Please provide a confirm password'
    }
    else if (user.confirmPassword !== user.password) {
        error.confirmPassword = 'Password does\'t match'
    }

    return {
        error,
        isValidate: Object.keys(error).length === 0
    }
}

module.exports = validate