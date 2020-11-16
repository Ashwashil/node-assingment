// jshint esversion: 6
const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    firstName: {
        type: String,
        required : true
    },
    lastName: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        required : true,
        minlength: 7
    }

});



module.exports = User;