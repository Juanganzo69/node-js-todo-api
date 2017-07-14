const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

// bcrypt.genSalt(10, ( err, salt ) => {
//     bcrypt.hash( password, salt, ( err, hash ) => {
//         console.log(hash);
//     });
// });

var hashedpassword = '$2a$10$M6wdKsg/fu4wUlD0kLSkQeyAI74EVWeuvCdw02Egl33bDNedJB.PG';

bcrypt.compare( password, hashedpassword, ( err, res ) => {
    console.log(res);
});

// var data = {
//     id: 4
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);
// var decoded = jwt.verify(token, '123abc');
// console.log('Decoded: ', decoded);

// var mensaje = 'Yo soy un número';
// var hash = SHA256(mensaje).toString();

// console.log(`Mensaje: ${ mensaje }`);
// console.log(`Hash: ${ hash }`);