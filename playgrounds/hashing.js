const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 4
};

var token = jwt.sign(data, '123abc');
console.log(token);
var decoded = jwt.verify(token, '123abc');
console.log('Decoded: ', decoded);

// var mensaje = 'Yo soy un número';
// var hash = SHA256(mensaje).toString();

// console.log(`Mensaje: ${ mensaje }`);
// console.log(`Hash: ${ hash }`);