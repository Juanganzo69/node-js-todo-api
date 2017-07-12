const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        required: true,
        trim: true,
        minlength: 1,
        type: String,
        unique: true,
        validate: {
            validator: ( value ) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} no es un email válido'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    tokens: [{
        access: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        }
    }]
});

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generarAuthToken = function(){
    var user = this;
    var access = 'auth';

    var token = jwt.sign({ _id: user._id.toHexString(), access }, '123abc').toString();
    user.tokens.push({access, token});

    return user.save().then( () => {
        return token;
    });
}

var User = mongoose.model('User', UserSchema);

module.exports = { User };