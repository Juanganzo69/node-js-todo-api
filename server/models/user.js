const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

UserSchema.statics.findByToken = function( token ){
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify( token, '123abc');    
    } catch (e) {
        // return new Promise( (resolve, reject ) => {
        //     reject();
        // });
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}

UserSchema.pre('save', function( next ){
    var user = this;

    if( user.isModified('password') ){
        bcrypt.genSalt(10, (err, salt  ) => {
            bcrypt.hash(user.password, salt, ( err, hash) => {
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = { User };